<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_seleksi;
use CodeIgniter\API\ResponseTrait;

class Seleksi extends BaseController
{
    use ResponseTrait;

    /**
     * @var M_seleksi
    */
    private $model;

    public function __construct()
    {
        $this->model = new M_seleksi();
    }

    public function index()
    {
        $data = $this->model->db->query("SELECT * FROM seleksi")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data seleksi!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id seleksi tidak ditemukan!',
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM seleksi WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data seleksi!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data seleksi tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'nilai_akhir' => $request['nilai_akhir'],
            'ranking' => $request['ranking'],
            'jarak_meter' => $request['jarak_meter'],
            'status_seleksi' => $request['status_seleksi'],
        ];

        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menambahkan data ke database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menambahkan data seleksi!'
            ], 400);
        }

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data seleksi!'
        ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id seleksi tidak ditemukan!',
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM seleksi WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data seleksi!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data seleksi tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id seleksi tidak ditemukan!',
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ], 403);
        }
        
        $request = $this->request->getRawInput();

        $dataUpdate = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'nilai_akhir' => $request['nilai_akhir'],
            'ranking' => $request['ranking'],
            'jarak_meter' => $request['jarak_meter'],
            'status_seleksi' => $request['status_seleksi'],
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal memperbarui data seleksi!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal memperbarui data seleksi!'
            ], 400);
        }

        return $this->respondUpdated([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data seleksi!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id seleksi tidak ditemukan!',
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->db->query("DELETE FROM seleksi WHERE id = ?", [$id])){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dari database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menghapus data seleksi!'
            ], 400);
        }

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data seleksi!'
        ], 200);
    }
}