<?php

namespace App\Controllers\pendaftaran;

use App\Controllers\BaseController;
use App\Models\M_pendaftaran;
use CodeIgniter\API\ResponseTrait;

class Pendaftaran extends BaseController
{
    use  ResponseTrait;

    /**
     * @var M_pendaftaran
     */
    private $model;

    public function __construct()
    {
        $this->model = new M_pendaftaran();
    }

    public function index()
    {
        $data = $this->model->db->query("SELECT * FROM pendaftaran")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data pendaftaran!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pendaftaran tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pendaftaran tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM pendaftaran WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data pendaftaran!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pendaftaran tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'siswa_id' => $request['siswa_id'],
            'sekolah_asal_id' => $request['sekolah_asal_id'],
            'jalur_id' => $request['jalur_id'],
            'tahun_ajaran_id' => $request['tahun_ajaran_id'],
            'kode_registrasi' => $request['kode_registrasi'],
            'status_daftar' => $request['status_daftar'],
            'tanggal_daftar' => $request['tanggal_daftar'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menyimpan data pendaftaran!',
                'status' => 403,
                'message' => 'Gagal menyimpan data pendaftaran!'
            ], 403);
        }

        return $this->respondCreated([
            'data' => null,
            'status' => 201,
            'message' => 'Berhasil menyimpan data pendaftaran!'
        ], 201);
    }
    
    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pendaftaran tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pendaftaran tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM pendaftaran WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data pendaftaran!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pendaftaran tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pendaftaran tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pendaftaran tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'siswa_id' => $request['siswa_id'],
            'sekolah_asal_id' => $request['sekolah_asal_id'],
            'jalur_id' => $request['jalur_id'],
            'tahun_ajaran_id' => $request['tahun_ajaran_id'],
            'kode_registrasi' => $request['kode_registrasi'],
            'status_daftar' => $request['status_daftar'],
            'tanggal_daftar' => $request['tanggal_daftar'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal mengubah data pendaftaran!',
                'status' => 403,
                'message' => 'Gagal mengubah data pendaftaran!'
            ], 403);
        }

        return $this->respondUpdated([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil mengubah data pendaftaran!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pendaftaran tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pendaftaran tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->delete($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data pendaftaran!',
                'status' => 403,
                'message' => 'Gagal menghapus data pendaftaran!'
            ], 403);
        }

        return $this->respondDeleted([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data pendaftaran!'
        ], 200);
    }
}