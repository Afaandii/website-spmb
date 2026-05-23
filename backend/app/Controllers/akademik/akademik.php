<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_akademik;
use CodeIgniter\API\ResponseTrait;

class Akademik extends BaseController
{
    use ResponseTrait;

    /**
     * @var M_akademik
     */
    private $model;

    public function __construct()
    {
        $this->model = new M_akademik();
    }

    public function index()
    {
        $data = $this->model->findAll();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data akademik!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id akademik tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data akademik!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data akademik tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getPost();

        if($this->model->insert($data)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menambahkan data akademik!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menambahkan data akademik!'
            ]);
        }
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id akademik tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data akademik!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data akademik tidak ditemukan!'
            ]);
        }
    }

    public function update(int $id){
        $data = $this->request->getPost();

        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id akademik tidak ditemukan!'
            ]);
        }

        if($this->model->update($id, $data)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil mengubah data akademik!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal mengubah data akademik!'
            ]);
        }
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id akademik tidak ditemukan!'
            ]);
        }

        if($this->model->delete($id)){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menghapus data akademik!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menghapus data akademik!'
            ]);
        }
    }
}