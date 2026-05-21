<?php

use App\Controllers\BaseController;
use App\Models\M_siswa;
use CodeIgniter\API\ResponseTrait;

class Siswa extends BaseController{
  use ResponseTrait;
  /**
   * @var M_siswa
  */
  protected $model;
  protected $format = 'json';

  public function __construct()
  {
    $this->model = new M_siswa();
  }

  public function index(){
    $data = $this->model->findAll();
    
    return $this->respond([
      'data' => $data,
      'status' => 200,
      'message' => 'Berhasil mengambil data siswa!'
    ]);
  }

  public function show(int $id){
    $data = $this->model->find($id);

    if($data){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Berhasil mengambil data siswa!'
      ]);
    } else {
      return $this->respond([
        'data' => null,
        'status' => 403,
        'message' => 'Data siswa tidak ditemukan!'
      ]);
    }
  }

  public function store(){
   $data = $this->request->getJSON(true);

   $this->model->insert($data);

    return $this->respondCreated([
      'error' => null,
      'status' => 201,
      'message' => 'Berhasil menambahkan data siswa!'
    ]);
  }

  public function edit(int $id){
    $data = $this->model->find($id);

    if($data){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Berhasil mengambil data siswa!'
      ]);
    } else {
      return $this->respond([
        'data' => null,
        'status' => 403,
        'message' => 'Data siswa tidak ditemukan!'
      ]);
    }
  }

  public function update(int $id){
    $data = $this->request->getJSON(true);

    $this->model->update($id, $data);

    return $this->respond([
      'error' => null,
      'status' => 200,
      'message' => 'Berhasil mengubah data siswa!'
    ]);
  }

  public function delete(int $id){
    $data = $this->model->find($id);

    if($data){
      $this->model->delete($id);
      return $this->respond([
        'error' => null,
        'status' => 200,
        'message' => 'Berhasil menghapus data siswa!'
      ]);
    } else {
      return $this->respond([
        'data' => null,
        'status' => 403,
        'message' => 'Data siswa tidak ditemukan!'
      ]);
    }
  }
}

?>