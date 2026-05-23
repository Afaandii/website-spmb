<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_prestasi;
use CodeIgniter\API\ResponseTrait;

class Prestasi extends BaseController
{
    use ResponseTrait;

    /**
    * @var M_prestasi
    */
    private $model;

    public function __construct()
    {
        $this->model = new M_prestasi();
    }

    public function index()
    {
        $data = $this->model->findAll();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data prestasi!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data prestasi!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data prestasi tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getJSON(true);

        $this->model->insert($data);

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data prestasi!'
         ]);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data prestasi!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data prestasi tidak ditemukan!'
            ]);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ]);
        }

        $data = $this->request->getJSON(true);

        $this->model->update($id, $data);

        return $this->respond([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data prestasi!'
        ]);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ]);
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data prestasi!'
        ]);
    }
}