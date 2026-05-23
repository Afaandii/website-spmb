<?php

namespace App\Controllers\role;
use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\M_role;

class Role extends BaseController{
  use ResponseTrait;

  /**
   * @var M_role
  */
  protected $model;
  protected $format = 'json';

  public function __construct()
  {
    $this->model = new M_role();
  }

  public function index(){
    $data = $this->model->db->query("SELECT * FROM role")->getResult();

    return $this->respond([
      'data' => $data,
      'status' => 200,
      'message' => 'Berhasil mengambil data role!'
    ], 200);
  }

  public function show(int $id){
    if(!$this->model->find($id)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Id role tidak ditemukan!',
        'status' => 403,
        'message' => 'Id role tidak ditemukan!'
      ], 403);
    }

    $data = $this->model->db->query("SELECT * FROM role WHERE id = ?", [$id])->getRow();

    if($data){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Berhasil mengambil data role!'
      ], 200);
    } else {
      return $this->respond([
        'data' => null,
        'status' => 403,
        'message' => 'Data role tidak ditemukan!'
      ], 403);
    }
  }

  public function store(){
   $request = $this->request->getVar();

   $dataStore = [
      'nama_role' => $request['nama_role'],
      'deskripsi' => $request['deskripsi'],
      'login_destinasi' => $request['login_destinasi'],
      'created_at' => date('Y-m-d H:i:s'),
      'updated_at' => date('Y-m-d H:i:s'),
   ];

   if(!$this->model->insert($dataStore)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menyimpan data ke database!',
        'status' => 400,
        'message' => 'Terjadi kesalahan!, Gagal menambahkan data role!'
      ], 400);
   }

    return $this->respondCreated([
      'error' => null,
      'status' => 201,
      'message' => 'Berhasil menambahkan data role!'
    ], 201);
  }

  public function update(int $id){
    if(!$this->model->find($id)){
      return $this->failNotFound('Data role tidak ditemukan!');
    }
    
    $request = $this->request->getRawInput();

    $dataUpdate = [
      'nama_role' => $request['nama_role'],
      'deskripsi' => $request['deskripsi'],
      'login_destinasi' => $request['login_destinasi'],
      'updated_at' => date('Y-m-d H:i:s'),
    ];

    if(!$this->model->update($id, $dataUpdate)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menyimpan data ke database!',
        'status' => 400,
        'message' => 'Terjadi kesalahan!, Gagal memperbarui data role!'
      ], 400);
    }

    return $this->respondUpdated([
      'error' => null,
      'status' => 200,
      'message' => 'Berhasil memperbarui data role!'
    ], 200);
  }

  public function delete(int $id){
    if(!$this->model->find($id)){
      return $this->failNotFound('Data role tidak ditemukan!');
    }

    if(!$this->model->db->query("DELETE FROM role WHERE id = ?", [$id])){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dari database!',
        'status' => 400,
        'message' => 'Terjadi kesalahan!, Gagal menghapus data role!'
      ], 400);
    }

    return $this->respondDeleted([
      'error' => null,
      'status' => 200,
      'message' => 'Berhasil menghapus data role!'
    ], 200);
  }
}

?>