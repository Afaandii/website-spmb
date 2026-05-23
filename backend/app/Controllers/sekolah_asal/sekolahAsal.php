<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\M_sekolah_asal;

class SekolahAsal extends BaseController
{
    use ResponseTrait;
    /**
     * @var M_sekolah_asal
     */

    protected $model;
    protected $format = 'json';

    public function __construct()
    {
        $this->model = new M_sekolah_asal();
    }
    
    public function index()
    {
        $data = $this->model->findAll();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data sekolah asal!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data sekolah asal!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data sekolah asal tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getJSON(true);

        $this->model->insert($data);

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data sekolah asal!',
        ]);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ]);
        }
        
        $data = $this->model->find($id);

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data sekolah asal!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data sekolah asal tidak ditemukan!'
            ]);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ]);
        }

        $data = $this->request->getJSON(true);
        $this->model->update($data, ['id' => $id]);

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil mengupdate data sekolah asal!'
        ]);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ]);
        }

        $this->model->delete(['id' => $id]);

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data sekolah asal!'
        ]);
    }
}