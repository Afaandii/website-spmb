<?php

namespace App\Controllers;

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
        $data = $this->model->findAll();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data pendaftaran!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id pendaftaran tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data pendaftaran!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pendaftaran tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getPost();

        if(!$data){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pendaftaran tidak ditemukan!'
            ]);
        }

        $save = $this->model->save($data);

        if($save){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menyimpan data pendaftaran!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menyimpan data pendaftaran!'
            ]);
        }
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id pendaftaran tidak ditemukan!'
            ]);
        }

        $data = $this->request->getPost();

        if(!$data){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pendaftaran tidak ditemukan!'
            ]);
        }

        $update = $this->model->update($id, $data);

        if($update){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil mengubah data pendaftaran!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal mengubah data pendaftaran!'
            ]);
        }
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id pendaftaran tidak ditemukan!'
            ]);
        }

        $delete = $this->model->delete($id);

        if($delete){
            return $this->respond([
                'data' => null,
                'status' => 200,
                'message' => 'Berhasil menghapus data pendaftaran!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Gagal menghapus data pendaftaran!'
            ]);
        }
    }
}