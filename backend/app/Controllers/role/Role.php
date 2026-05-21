<?php

namespace App\Controllers;
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
    $data = $this->model->findAll();
    
    return $this->respond([
      'data' => $data,
      'status' => 200,
      'message' => 'Berhasil mengambil data role!'
    ]);
  }

  public function show(int $id){
    $data = $this->model->find($id);

    if($data){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Berhasil mengambil data role!'
      ]);
    } else {
      return $this->respond([
        'data' => null,
        'status' => 403,
        'message' => 'Data role tidak ditemukan!'
      ]);
    }
  }

  public function store(){
   $data = $this->request->getJSON(true);

   $this->model->insert([
    'nama_role' => $data['nama_role'],
    'deskripsi' => $data['deskripsi'],
    'login_destinasi' => $data['login_destinasi'],
    'created_at' => date('Y-m-d H:i:s'),
   ]);

    return $this->respondCreated([
      'error' => null,
      'status' => 201,
      'message' => 'Berhasil menambahkan data role!'
    ]);
  }

  public function update(int $id){
    if(!$this->model->find($id)){
      return $this->failNotFound('Data role tidak ditemukan!');
    }
    
    $data = $this->request->getJSON(true);

    $this->model->update($id, $data);

    return $this->respondUpdated([
      'error' => null,
      'status' => 200,
      'message' => 'Berhasil memperbarui data role!'
    ]);
  }

  public function delete(int $id){
    if(!$this->model->find($id)){
      return $this->failNotFound('Data role tidak ditemukan!');
    }

    $this->model->delete($id);

    return $this->respondDeleted([
      'error' => null,
      'status' => 200,
      'message' => 'Berhasil menghapus data role!'
    ]);
  }
}

?>