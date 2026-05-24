<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_pengumuman;
use CodeIgniter\API\ResponseTrait;

class Pengumuman extends BaseController
{
    use ResponseTrait;

    /**
    * @var M_pengumuman
    */
    private $model;

    public function __construct()
    {
        $this->model = new M_pengumuman();
    }

    public function index()
    {
        $data = $this->model->db->query("SELECT * FROM pengumuman")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data pengumuman!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pengumuman tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pengumuman tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM pengumuman WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data pengumuman!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pengumuman tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'jalur_id' => $request['jalur_id'],
            'dibuat_oleh' => $request['dibuat_oleh'],
            'tahun_ajaran_id' => $request['tahun_ajaran_id'],
            'judul' => $request['judul'],
            'slug' => $request['slug'],
            'content' => $request['content'],
            'kategori' => $request['kategori'],
            'thumbnail' => $request['thumbnail'],
            'tanggal_publish' => $request['tanggal_publish'],
            'status_publish' => $request['status_publish'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menambahkan pengumuman!',
                'status' => 403,
                'message' => 'Gagal menambahkan pengumuman!'
            ], 403);
        }

        return $this->respond([
            'data' => null,
            'status' => 201,
            'message' => 'Pengumuman berhasil ditambahkan!'
        ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pengumuman tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pengumuman tidak ditemukan!'
            ], 403);
        }

        $data = $this->model->db->query("SELECT * FROM pengumuman WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data pengumuman!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pengumuman tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pengumuman tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pengumuman tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'jalur_id' => $request['jalur_id'],
            'dibuat_oleh' => $request['dibuat_oleh'],
            'tahun_ajaran_id' => $request['tahun_ajaran_id'],
            'judul' => $request['judul'],
            'slug' => $request['slug'],
            'content' => $request['content'],
            'kategori' => $request['kategori'],
            'thumbnail' => $request['thumbnail'],
            'tanggal_publish' => $request['tanggal_publish'],
            'status_publish' => $request['status_publish'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal mengubah pengumuman!',
                'status' => 403,
                'message' => 'Gagal mengubah pengumuman!'
            ], 403);
        }

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Pengumuman berhasil diubah!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id pengumuman tidak ditemukan!',
                'status' => 403,
                'message' => 'Id pengumuman tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->delete($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus pengumuman!',
                'status' => 403,
                'message' => 'Gagal menghapus pengumuman!'
            ], 403);
        }

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Pengumuman berhasil dihapus!'
        ], 200);
    }
}