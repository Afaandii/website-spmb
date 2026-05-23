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
        $data = $this->model->findAll();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data pengumuman!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id pengumuman tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data pengumuman!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data pengumuman tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getPost();

        $this->model->insert($data);

        return $this->respond([
            'data' => null,
            'status' => 201,
            'message' => 'Pengumuman berhasil ditambahkan!'
        ]);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id pengumuman tidak ditemukan!'
            ]);
        }

        $data = $this->request->getPost();

        $this->model->update($id, $data);

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Pengumuman berhasil diubah!'
        ]);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id pengumuman tidak ditemukan!'
            ]);
        }

        $this->model->delete($id);

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Pengumuman berhasil dihapus!'
        ]);
    }
}