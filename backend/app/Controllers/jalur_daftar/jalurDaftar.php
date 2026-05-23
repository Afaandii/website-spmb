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
        $data = $this->model->findAll();
        
        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data jalur daftar!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id jalur daftar tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data jalur daftar!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data jalur daftar tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getPost();

        if($this->model->insert($data)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menambahkan data jalur daftar!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menambahkan data jalur daftar!'
            ]);
        }
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id jalur daftar tidak ditemukan!'
            ]);
        }

        $data = $this->request->getPost();

        if($this->model->update($id, $data)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil mengubah data jalur daftar!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal mengubah data jalur daftar!'
            ]);
        }
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id jalur daftar tidak ditemukan!'
            ]);
        }

        if($this->model->delete($id)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menghapus data jalur daftar!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menghapus data jalur daftar!'
            ]);
        }
    }
}