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
        $data = $this->model->db->query("SELECT * FROM akademik")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data akademik!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id akademik tidak ditemukan!',
                'status' => 403,
                'message' => 'Id akademik tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM akademik WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data akademik!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data akademik tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataUpdate = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'tahun_ajaran_id' => $request['tahun_ajaran_id'],
            'semester' => $request['semester'],
            'nilai_rata_rata' => $request['nilai_rata_rata'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->insert($dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Terjadi kesalahan!, Gagal menyimpan data akademik',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menyimpan data akademik'
            ], 400);
        }

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menyimpan data akademik'
        ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id akademik tidak ditemukan!',
                'status' => 403,
                'message' => 'Id akademik tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM akademik WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data akademik!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data akademik tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        $request = $this->request->getRawInput();

        $dataUpdate = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'tahun_ajaran_id' => $request['tahun_ajaran_id'],
            'semester' => $request['semester'],
            'nilai_rata_rata' => $request['nilai_rata_rata'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : "Terjadi kesalahan!, Gagal memeperbarui data akademik",
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal memperbarui data akademik'
            ], 400);
        }

        return $this->respondUpdated([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data akademik!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() :  'Id akademik tidak ditemukan!',
                'status' => 403,
                'message' => 'Id akademik tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->db->query("DELETE FROM akademik WHERE id = ?", [$id])){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Terjadi kesalahan!, Gagal menghapus data akademik!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menghapus data akademik!'
            ], 400);
        }

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data akademik!'
        ], 200);
    }
}