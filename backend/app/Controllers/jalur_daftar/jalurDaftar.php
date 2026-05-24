<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_jalur_daftar;
use CodeIgniter\API\ResponseTrait;

class JalurDaftar extends BaseController
{
    use ResponseTrait;

    /**
     * @var M_jalur_daftar
     */

    private $model;

    public function __construct()
    {
        $this->model = new M_jalur_daftar();
    }

    public function index()
    {
        $data = $this->model->db->query("SELECT * FROM jalur_daftar")->getResult();
        
        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data jalur daftar!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id jalur daftar tidak ditemukan!',
                'status' => 403,
                'message' => 'Id jalur daftar tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM jalur_daftar WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data jalur daftar!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data jalur daftar tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'nama_jalur' => $request['nama_jalur'],
            'tipe_seleksi' => $request['tipe_seleksi'],
            'kuota' => $request['kuota'],
            'metode_perankingan' => $request['metode_perankingan'],
            'tanggal_mulai' => $request['tanggal_mulai'],
            'tanggal_selesai' => $request['tanggal_selesai'],
            'is_active' => $request['is_active'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menyimpan data jalur daftar!',
                'status' => 403,
                'message' => 'Gagal menyimpan data jalur daftar!'
            ], 403);
        }

        return $this->respondCreated([
            'data' => null,
            'status' => 201,
            'message' => 'Berhasil menyimpan data jalur daftar!'
        ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id jalur daftar tidak ditemukan!',
                'status' => 403,
                'message' => 'Id jalur daftar tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM jalur_daftar WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data jalur daftar!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data jalur daftar tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id jalur daftar tidak ditemukan!',
                'status' => 403,
                'message' => 'Id jalur daftar tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'nama_jalur' => $request['nama_jalur'],
            'tipe_seleksi' => $request['tipe_seleksi'],
            'kuota' => $request['kuota'],
            'metode_perankingan' => $request['metode_perankingan'],
            'tanggal_mulai' => $request['tanggal_mulai'],
            'tanggal_selesai' => $request['tanggal_selesai'],
            'is_active' => $request['is_active'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal mengupdate data jalur daftar!',
                'status' => 403,
                'message' => 'Gagal mengupdate data jalur daftar!'
            ], 403);
        }

        return $this->respondUpdated([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil mengupdate data jalur daftar!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id jalur daftar tidak ditemukan!',
                'status' => 403,
                'message' => 'Id jalur daftar tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->delete($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data jalur daftar!',
                'status' => 403,
                'message' => 'Gagal menghapus data jalur daftar!'
            ], 403);
        }

        return $this->respondDeleted([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data jalur daftar!'
        ], 200);
    }
}