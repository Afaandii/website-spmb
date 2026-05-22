<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\M_tahun_ajaran;

class TahunAjaran extends BaseController
{
    use ResponseTrait;
    /**
     * @var M_tahun_ajaran
     */
    private $model;
    protected $format = 'json';

    public function __construct()
    {
        $this->model = new M_tahun_ajaran();
    }

    public function index()
    {
        $data = $this->model->findAll();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data tahun ajaran!'
        ]);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }
        $data = $this->model->find($id);

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data tahun ajaran!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data tahun ajaran tidak ditemukan!'
            ]);
        }
    }

    public function store(){
        $data = $this->request->getJSON(true);

        $this->model->insert($data);

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data tahun ajaran!'
        ]);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }
        
        $data = $this->model->find($id);

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data tahun ajaran!'
            ]);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data tahun ajaran tidak ditemukan!'
            ]);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }

        $data = $this->request->getJSON(true);

        $this->model->update($id, $data);

        return $this->respondUpdated([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data tahun ajaran!'
        ]);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data tahun ajaran!'
        ]);
    }
}