<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\M_dokumen;
use CodeIgniter\API\ResponseTrait;

class DataOrangTua extends BaseController
{
    use ResponseTrait;

    /**
     * @var M_dokumen
     */
    private $model;

    public function __construct()
    {
        $this->model = new M_dokumen();
    }

    public function index()
    {
        $data = $this->model->db->query("SELECT * FROM data_orang_tua")->getResult();
        
        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data orang tua!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id data orang tua tidak ditemukan!',
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM data_orang_tua WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data orang tua!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data orang tua tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataStore = [
            'siswa_id' => $request['siswa_id'],
            'nama_ayah' => $request['nama_ayah'],
            'pekerjaan_ayah' => $request['pekerjaan_ayah'],
            'penghasilan_ayah' => $request['penghasilan_ayah'],
            'pendidikan_terakhir_ayah' => $request['pendidikan_terakhir_ayah'],
            'nama_ibu' => $request['nama_ibu'],
            'pekerjaan_ibu' => $request['pekerjaan_ibu'],
            'penghasilan_ibu' => $request['penghasilan_ibu'],
            'pendidikan_terakhir_ibu' => $request['pendidikan_terakhir_ibu'],
            'no_telp_aktif' => $request['no_telp_aktif'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->insert($dataStore)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menyimpan data orang tua!',
                'status' => 403,
                'message' => 'Gagal menyimpan data orang tua!'
            ], 403);
        }

        return $this->respondCreated([
            'data' => null,
            'status' => 201,
            'message' => 'Berhasil menyimpan data orang tua!'
        ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id data orang tua tidak ditemukan!',
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM data_orang_tua WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data orang tua!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data orang tua tidak ditemukan!'
            ], 403);
        }
    }

    public function updated(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id data orang tua tidak ditemukan!',
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'siswa_id' => $request['siswa_id'],
            'nama_ayah' => $request['nama_ayah'],
            'pekerjaan_ayah' => $request['pekerjaan_ayah'],
            'penghasilan_ayah' => $request['penghasilan_ayah'],
            'pendidikan_terakhir_ayah' => $request['pendidikan_terakhir_ayah'],
            'nama_ibu' => $request['nama_ibu'],
            'pekerjaan_ibu' => $request['pekerjaan_ibu'],
            'penghasilan_ibu' => $request['penghasilan_ibu'],
            'pendidikan_terakhir_ibu' => $request['pendidikan_terakhir_ibu'],
            'no_telp_aktif' => $request['no_telp_aktif'],
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal mengubah data orang tua!',
                'status' => 403,
                'message' => 'Gagal mengubah data orang tua!'
            ], 403);
        }

        return $this->respondUpdated([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil mengubah data orang tua!'
        ], 200);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id data orang tua tidak ditemukan!',
                'status' => 403,
                'message' => 'Id data orang tua tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->delete($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data orang tua!',
                'status' => 403,
                'message' => 'Gagal menghapus data orang tua!'
            ], 403);
        }

        return $this->respondDeleted([
            'data' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data orang tua!'
        ], 200);
    }
    
}