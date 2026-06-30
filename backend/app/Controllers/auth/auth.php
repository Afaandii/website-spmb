<?php 

namespace App\Controllers\auth;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait; 
use Firebase\JWT\JWT;
use App\Models\M_user;

class Auth extends BaseController{
  use ResponseTrait;

   /**
   * @var M_user
   */

  private $model;

  public function __construct()
  {
    $this->model = new M_user();
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
    $username = $this->request->getVar('username');
    $password = $this->request->getVar('password');

    $data = [
      'username' => $username,
      'password' => $this->model->hashPassword($password),
    ];

    if($this->model->insert($data)){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Register berhasil!'
      ], 200);
    } else {
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Gagal register!',
        'status' => 403,
        'message' => 'Terjadi kesalahan!, Gagal register!'
      ], 403);
    }
  }
}

?>