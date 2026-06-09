<?php

namespace App\Controllers\sekolah_asal;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\M_sekolah_asal;
use Config\Services;

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
        $data = $this->model->db->query("SELECT * FROM sekolah_asal")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data sekolah asal!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id sekolah asal tidak ditemukan!',
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM sekolah_asal WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data sekolah asal!'
            ], 200);
        } else {
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Data sekolah asal tidak ditemukan!',
                'status' => 403,
                'message' => 'Data sekolah asal tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'npsn' => $request['npsn'],
            'nama_sekolah' => $request['nama_sekolah'],
            'jenjang_sekolah' => $request['jenjang_sekolah'],
            'alamat_sekolah' => $request['alamat_sekolah'],
        ];

        $validation = Services::validation();

        $validation->setRules([
            'npsn' => 'is_unique[sekolah_asal.npsn]',
        ], [
            'npsn' => [
                'is_unique' => 'NPSN sudah terdaftar di database!'
            ],
        ]);

        if(!$validation->run($request)) {
            return $this->respond([
                'error' => $validation->getErrors(),
                'status' => 400,
                'message' => 'terjadi kesalahan!, data npsn harus unique!'
            ], 400);
        }

        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menambahkan data ke database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menambahkan data sekolah asal!'
            ], 400);
        }

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data sekolah asal!',
        ]);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id sekolah asal tidak ditemukan!',
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM sekolah_asal WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data sekolah asal!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data sekolah asal tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id sekolah asal tidak ditemukan!',
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'npsn' => $request['npsn'],
            'nama_sekolah' => $request['nama_sekolah'],
            'jenjang_sekolah' => $request['jenjang_sekolah'],
            'alamat_sekolah' => $request['alamat_sekolah'],
        ];

        $validation = Services::validation();

        $validation->setRules([
            'npsn' => "is_unique[sekolah_asal.npsn,id,{$id}]",
        ], [
            'npsn' => [
                'is_unique' => 'NPSN sudah terdaftar di database!'
            ],
        ]);

        if(!$validation->run($request)) {
            return $this->respond([
                'error' => $validation->getErrors(),
                'status' => 400,
                'message' => 'NPSN sudah digunakan, mohon gunakan NPSN lain!'
            ], 400);
        }

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal memperbarui data ke database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal memperbarui data sekolah asal!'
            ], 400);
        }

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil mengupdate data sekolah asal!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id sekolah asal tidak ditemukan!',
                'status' => 403,
                'message' => 'Id sekolah asal tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->db->query("DELETE FROM sekolah_asal WHERE id = ?", [$id])){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dari database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menghapus data sekolah asal!'
            ], 400);
        }

        return $this->respond([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data sekolah asal!'
        ],200);
    }
}