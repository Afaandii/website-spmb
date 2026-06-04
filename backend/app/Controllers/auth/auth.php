<?php 

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait; 
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
    $username = $this->request->getVar('username');
    $password = $this->request->getVar('password');

    $user = $this->model->where('username', $username)->first();

    if($user){
      if(password_verify($password, $user['password'])){
        return $this->respond([
          'data' => $user,
          'status' => 200,
          'message' => 'Login berhasil!'
        ], 200);
      } else {
        return $this->respond([
          'error' => 'Password salah!',
          'status' => 403,
          'message' => 'Password salah!'
        ], 403);
      }
    } else {
      return $this->respond([
        'error' => 'Username tidak ditemukan!',
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