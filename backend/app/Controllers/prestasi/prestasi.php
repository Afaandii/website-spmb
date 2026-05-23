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
        $data = $this->model->db->query("SELECT * FROM prestasi")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data prestasi!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM prestasi WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data prestasi!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data prestasi tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'nama_prestasi' => $request['nama_prestasi'],
            'jenis_prestasi' => $request['jenis_prestasi'],
            'tingkat_lomba' => $request['tingkat_lomba'],
            'keterangan_prestasi' => $request['keterangan_prestasi'],
            'skor_tambahan' => $request['skor_tambahan'],
            'sertifikat_path' => $request['sertifikat_path'],
            'diverifikasi_oleh' => $request['diverifikasi_oleh'],
            'status_validasi' => $request['status_validasi'],
            'tanggal_validasi' => $request['tanggal_validasi'],
            'created_at' => date('Y-m-d H:i:s'),
        ];
        
        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menambahkan data ke database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menambahkan data prestasi!'
            ], 400);
        }

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data prestasi!'
         ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id prestasi tidak ditemukan!',
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM prestasi WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data prestasi!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data prestasi tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id prestasi tidak ditemukan!',
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'pendaftaran_id' => $request['pendaftaran_id'],
            'nama_prestasi' => $request['nama_prestasi'],
            'jenis_prestasi' => $request['jenis_prestasi'],
            'tingkat_lomba' => $request['tingkat_lomba'],
            'keterangan_prestasi' => $request['keterangan_prestasi'],
            'skor_tambahan' => $request['skor_tambahan'],
            'sertifikat_path' => $request['sertifikat_path'],
            'diverifikasi_oleh' => $request['diverifikasi_oleh'],
            'status_validasi' => $request['status_validasi'],
            'tanggal_validasi' => $request['tanggal_validasi'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];
        

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal memperbarui data ke database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal memperbarui data prestasi!'
            ], 400);
        }

        return $this->respond([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data prestasi!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id prestasi tidak ditemukan!',
                'status' => 403,
                'message' => 'Id prestasi tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->db->query("DELETE FROM prestasi WHERE id = ?", [$id])){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dari database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menghapus data prestasi!'
            ], 400);
        }

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data prestasi!'
        ], 200);
    }
}