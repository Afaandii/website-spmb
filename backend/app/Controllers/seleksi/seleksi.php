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
        $data = $this->model->findAll();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data seleksi!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data seleksi!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data seleksi tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getJSON(true);

        $this->model->insert($data);

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data seleksi!'
        ]);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data seleksi!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data seleksi tidak ditemukan!'
            ]);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ]);
        }
        
        $data = $this->request->getJSON(true);

        $this->model->update($id, $data);

        return $this->respondUpdated([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data seleksi!'
        ]);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id seleksi tidak ditemukan!'
            ]);
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data seleksi!'
        ]);
    }
}