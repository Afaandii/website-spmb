<?php

namespace App\Controllers\tahun_ajaran;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\M_tahun_ajaran;
use Config\Services;

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
        $data = $this->model->db->query("SELECT * FROM tahun_ajaran")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data tahun ajaran!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }
        
        $data = $this->model->db->query("SELECT * FROM tahun_ajaran WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data tahun ajaran!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data tahun ajaran tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $validation = Services::validation();

        $validation->setRules([
            'tahun' => 'is_unique[tahun_ajaran.tahun]'   
        ], [
            'tahun' => [
                'is_unique' => 'Tahun sudah digunakan, mohon gunakan tahun lain!'
            ]
        ]);

        if(!$validation->run($request)) {
            return $this->respond([
                'error' => $validation->getErrors(),
                'status' => 400,
                'message' => 'Terjadi kesalahan saat menambahkan data tahun ajaran!, data tahun ajaran harus unique!'
            ], 400);
        }

        $dataInsert = [
            'tahun' => $request['tahun'],
            'status' => $request['status'],
        ];

        if(!$this->model->insert($dataInsert)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menambahkan data ke database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan saat menambahkan data tahun ajaran!, coba cek kembali datanya!'
            ], 400);
        } else {
            return $this->respondCreated([
                'error' => null,
                'status' => 201,
                'message' => 'Berhasil menambahkan data tahun ajaran!'
            ], 201);
        }
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }
        
        $data = $this->model->db->query("SELECT * FROM tahun_ajaran WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data tahun ajaran!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data tahun ajaran tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'tahun' => $request['tahun'],
            'status' => $request['status'],
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal memperbarui data ke database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan saat memperbarui data tahun ajaran!, coba cek kembali datanya!'
            ], 400);
        }

        return $this->respondUpdated([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data tahun ajaran!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->failNotFound('Data tahun ajaran tidak ditemukan!');
        }

        if(!$this->model->db->query("DELETE FROM tahun_ajaran WHERE id = ?", [$id])){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dari database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan saat menghapus data tahun ajaran!'
            ], 400);
        }

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data tahun ajaran!'
        ], 200);
    }
}