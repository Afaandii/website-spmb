<?php 

namespace App\Controllers\auth;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait; 
use Firebase\JWT\JWT;
use App\Models\M_user;
use App\Models\M_siswa;
use Config\Database;

class Auth extends BaseController{
  use ResponseTrait;

  private M_user $model;
  private M_siswa $modelSiswa;

  public function __construct()
  {
    $this->model = new M_user();
    $this->modelSiswa = new M_siswa();
  }

  public function login(){
    $identifier = $this->request->getVar('username');
    $password = $this->request->getVar('password');

    if (empty($identifier) || empty($password)) {
        return $this->respond([
            'status' => 400,
            'message' => 'Username/NISN dan Password wajib diisi!'
        ], 400);
    }

    $user = $this->model->select('users.*, siswa.nisn, siswa.nama_lengkap')
                        ->join('siswa', 'siswa.id = users.siswa_id', 'left')
                        ->groupStart()
                        ->where('users.username', $identifier)
                        ->orWhere('siswa.nisn', $identifier)
                        ->groupEnd()
                        ->first();

    if($user){
      if(password_verify($password, $user['password'])){
        $key = getenv('JWT_SECRET');
        $time = time();
        $expire = $time + getenv('JWT_TIME_TO_LIVE');

        $payload = [
          'iat' => $time,
          'exp' => $expire,
          'uid' => $user['id'],
          'username' => $user['username']
        ];

        $token = JWT::encode($payload, $key, 'HS256');

        $this->model->builder()->where('username', $user['username'])->update([
            'last_login_at' => date('Y-m-d H:i:s'),
            'token' => $token,
        ]);

        return $this->respond([
          'datas' => $user,
          'token' => $token,
          'status' => 200,
          'message' => 'Login berhasil!'
        ], 200);
      } else {
        return $this->respond([
          'error' => 'Password salah!',
          'token' => null,
          'status' => 403,
          'message' => 'Password salah!'
        ], 403);
      }
    } else {
      return $this->respond([
        'error' => 'Username tidak ditemukan!',
        'token' => null,
        'status' => 403,
        'message' => 'Username tidak ditemukan!'
      ], 403);
    }
  }

  public function register(){
    $nisn = $this->request->getVar('nisn');
    $username = $this->request->getVar('username');
    $email = $this->request->getVar('email');
    $password = $this->request->getVar('password');

    $dataSiswa = [
      'nisn' => $nisn,
    ];

    // mencegah duplikasi data siswa berdasarkan NISN menggunakan transaction
    $db = Database::connect();
    $db->transStart();

    $db->table('siswa')->insert($dataSiswa);
    $idSiswa = $db->insertID();

    $data = [
      'role_id' => 2,
      'siswa_id' => $idSiswa,
      'username' => $username,
      'email' => $email,
      'password' => $this->model->hashPassword($password),
      'is_active' => '1',
    ];

    $this->model->insert($data);

    $db->transComplete();

    if($db->transStatus() === TRUE){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Register berhasil!'
      ], 200);
    } else {
      $errors = array_merge($this->model->errors() ?? [], $this->modelSiswa->errors() ?? []);
      return $this->respond([
        'error' => !empty($errors) ? $errors : 'Gagal register!',
        'status' => 403,
        'message' => 'Terjadi kesalahan!, Gagal register!'
      ], 403);
    }
  }

  public function logout(){
    $token = $this->request->getVar('token');

    if(!$token){
      return $this->respond([
        'status' => 400,
        'message' => 'Token tidak ditemukan!'
      ], 400);
    }

    $user = $this->model->where('token', $token)->first();

    if($user){
      $this->model->builder()->where('id', $user['id'])->update([
          'token' => null,
      ]);

      return $this->respond([
        'status' => 200,
        'message' => 'Logout berhasil!'
      ], 200);
    } else {
      return $this->respond([
        'status' => 403,
        'message' => 'Token tidak valid!'
      ], 403);
    }
  }
}

?>