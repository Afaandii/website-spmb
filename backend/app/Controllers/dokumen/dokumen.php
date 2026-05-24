<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_dokumen;
use CodeIgniter\API\ResponseTrait;

class Dokumen extends BaseController
{
    use ResponseTrait;

    /**
     * @var M_dokumen
     */
    private $model;

    public function __construct()
    {
        $this->model = new M_dokumen();
    }
    
    public function index()
    {
        $data = $this->model->db->query("SELECT * FROM dokumen")->getResult();
        
        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data dokumen!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id dokumen tidak ditemukan!',
                'status' => 403,
                'message' => 'Id dokumen tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM dokumen WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data dokumen!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data dokumen tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'jenis_dokumen' => $request['jenis_dokumen'],
            'file_path' => $request['file_path'],
            'status_verifikasi' => $request['status_verifikasi'],
            'keterangan_dokumen' => $request['keterangan_dokumen'],
            'mimes_type' => $request['mimes_type'],
            'ukuran_file' => $request['ukuran_file'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menyimpan data dokumen!',
                'status' => 403,
                'message' => 'Gagal menyimpan data dokumen!'
            ], 403);
        }

        return $this->respond([
            'data' => null,
            'status' => 201,
            'message' => 'Berhasil menyimpan data dokumen!'
        ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id dokumen tidak ditemukan!',
                'status' => 403,
                'message' => 'Id dokumen tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM dokumen WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data dokumen!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data dokumen tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id dokumen tidak ditemukan!',
                'status' => 403,
                'message' => 'Id dokumen tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'jenis_dokumen' => $request['jenis_dokumen'],
            'file_path' => $request['file_path'],
            'status_verifikasi' => $request['status_verifikasi'],
            'keterangan_dokumen' => $request['keterangan_dokumen'],
            'mimes_type' => $request['mimes_type'],
            'ukuran_file' => $request['ukuran_file'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal mengupdate data dokumen!',
                'status' => 403,
                'message' => 'Gagal mengupdate data dokumen!'
            ], 403);
        }

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil mengupdate data dokumen!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id dokumen tidak ditemukan!',
                'status' => 403,
                'message' => 'Id dokumen tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->db->query("DELETE FROM dokumen WHERE id = ?", [$id])){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dokumen!',
                'status' => 403,
                'message' => 'Gagal menghapus data dokumen!'
            ], 403);
        }

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data dokumen!'
        ], 200);
    }
}