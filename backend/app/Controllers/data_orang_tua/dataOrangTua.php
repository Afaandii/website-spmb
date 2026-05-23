<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_dokumen;
use CodeIgniter\API\ResponseTrait;

class DataOrangTua extends BaseController
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
        $data = $this->model->findAll();
        
        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data orang tua!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data orang tua!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data orang tua tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getPost();

        if($this->model->insert($data)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menambahkan data orang tua!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menambahkan data orang tua!'
            ]);
        }
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ]);
        }

        $data = $this->request->getPost();

        if($this->model->update($id, $data)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil mengubah data orang tua!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal mengubah data orang tua!'
            ]);
        }
    }

    public function update(int $id, $data){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ]);
        }

        if($this->model->update($id, $data)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil mengubah data orang tua!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal mengubah data orang tua!'
            ]);
        }
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ]);
        }

        if($this->model->delete($id)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menghapus data orang tua!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menghapus data orang tua!'
            ]);
        }
    }
    
}