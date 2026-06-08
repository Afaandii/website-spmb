<?php

use App\Controllers\BaseController;
use App\Models\M_siswa;
use CodeIgniter\API\ResponseTrait;
use Config\Services;

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
    $data = $this->model->db->query("SELECT * FROM siswa")->getResult();
    
    return $this->respond([
      'data' => $data,
      'status' => 200,
      'message' => 'Berhasil mengambil data siswa!'
    ], 200);
  }

  public function show(int $id){
    if(!$this->model->find($id)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Id siswa tidak ditemukan!',
        'status' => 403,
        'message' => 'Id siswa tidak ditemukan!'
      ], 403);
    }

    $data = $this->model->db->query("SELECT * FROM siswa WHERE id = ?", [$id])->getRow();

    if($data){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Berhasil mengambil data siswa!'
      ], 200);
    } else {
      return $this->respond([
        'data' => null,
        'status' => 403,
        'message' => 'Data siswa tidak ditemukan!'
      ], 403);
    }
  }

  public function store(){
   $request = $this->request->getVar();

   $validation = Services::validation();

   $validation->setRules([
      'nik' => 'is_unique[siswa.nik]',
      'nisn' => 'is_unique[siswa.nisn]',
      'npsn' => 'is_unique[siswa.npsn]',
   ], [
      'nik' => [
        'is_unique' => 'NIK sudah digunakan sebelumnya, mohon gunakan NIK lain.'
      ],
      'nisn' => [
        'is_unique' => 'NISN sudah digunakan sebelumnya, mohon gunakan NISN lain.'
      ],
      'npsn' => [
        'is_unique' => 'NPSN sudah digunakan sebelumnya, mohon gunakan NPSN lain.'
      ],
   ]);

   if(!$validation->run($request)) {
     return $this->respond([
       'error' => $validation->getErrors(),
       'status' => 400,
       'message' => 'Terjadi kesalahan saat menambahkan data siswa!, data harus unique!'
     ], 400);
   }

   $dataInsert = [
     'nik' => $request['nik'],
     'nisn' => $request['nisn'],
     'npsn' => $request['npsn'],
     'nama_lengkap' => $request['nama_lengkap'],
     'tempat_lahir' => $request['tempat_lahir'],
     'tanggal_lahir' => $request['tanggal_lahir'],
     'jenis_kelamin' => $request['jenis_kelamin'],
     'agama' => $request['agama'],
     'alamat' => $request['alamat'],
     'no_telp' => $request['no_telp'],
     'latitude' => $request['latitude'],
     'longitude' => $request['longitude'],
     'created_at' => date('Y-m-d H:i:s'),
     'updated_at' => date('Y-m-d H:i:s'),
   ];

   if(!$this->model->insert($dataInsert)){
     return $this->respond([
       'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menambahkan data ke database!',
       'status' => 400,
       'message' => 'Terjadi kesalahan saat menambahkan data siswa!, coba cek kembali datanya!'
     ], 400);
   }

    return $this->respondCreated([
      'error' => null,
      'status' => 201,
      'message' => 'Berhasil menambahkan data siswa!'
    ], 201);
  }

  public function edit(int $id){
    if(!$this->model->find($id)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Id siswa tidak ditemukan!',
        'status' => 403,
        'message' => 'Id siswa tidak ditemukan!'
      ], 403);
    }

    $data = $this->model->db->query("SELECT * FROM siswa WHERE id = ?", [$id])->getRow();

    if($data){
      return $this->respond([
        'data' => $data,
        'status' => 200,
        'message' => 'Berhasil mengambil data siswa!'
      ], 200);
    } else {
      return $this->respond([
        'data' => null,
        'status' => 403,
        'message' => 'Data siswa tidak ditemukan!'
      ], 403);
    }
  }

  public function update(int $id){
    if(!$this->model->find($id)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Id siswa tidak ditemukan!',
        'status' => 403,
        'message' => 'Id siswa tidak ditemukan!'
      ], 403);
    }
    $request = $this->request->getRawInput();

    $dataUpdate = [
      'nik' => $request['nik'],
      'nisn' => $request['nisn'],
      'npsn' => $request['npsn'],
      'nama_lengkap' => $request['nama_lengkap'],
      'tempat_lahir' => $request['tempat_lahir'],
      'tanggal_lahir' => $request['tanggal_lahir'],
      'jenis_kelamin' => $request['jenis_kelamin'],
      'agama' => $request['agama'],
      'alamat' => $request['alamat'],
      'no_telp' => $request['no_telp'],
      'latitude' => $request['latitude'],
      'longitude' => $request['longitude'],
      'updated_at' => date('Y-m-d H:i:s'),
    ];

    if(!$this->model->update($id, $dataUpdate)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Gagal memperbarui data ke database!',
        'status' => 400,
        'message' => 'Terjadi kesalahan saat memperbarui data siswa!, coba cek kembali datanya!'
      ], 400);
    }

    return $this->respond([
      'error' => null,
      'status' => 200,
      'message' => 'Berhasil mengubah data siswa!'
    ], 200);
  }

  public function delete(int $id){
    if(!$this->model->find($id)){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Id siswa tidak ditemukan!',
        'status' => 403,
        'message' => 'Id siswa tidak ditemukan!'
      ], 403);
    }

    if(!$this->model->db->query("DELETE FROM siswa WHERE id = ?", [$id])){
      return $this->respond([
        'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dari database!',
        'status' => 400,
        'message' => 'Terjadi kesalahan!, Gagal menghapus data siswa!'
      ], 400);
    }

    return $this->respondDeleted([
      'error' => null,
      'status' => 200,
      'message' => 'Berhasil menghapus data siswa!'
    ], 200);
  }
}

?>