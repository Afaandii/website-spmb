<?php

namespace App\Controllers\user;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\M_user;

class User extends BaseController
{
    use ResponseTrait;

    /**
     * @var M_user
     */
    private $model;

    public function __construct()
    {
        $this->model = new M_user();
    }

    public function index()
    {
        $data = $this->model->db->query("SELECT * FROM users")->getResult();

        return $this->respond([
            'data' => $data,
            'status' => 200,
            'message' => 'Berhasil mengambil data user!'
        ], 200);
    }

    public function show(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id user tidak ditemukan!',
                'status' => 403,
                'message' => 'Id user tidak ditemukan!'
            ], 403);
        }
        
        $data = $this->model->db->query("SELECT * FROM users WHERE id = ?", [$id])->getRow();
        
        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data user!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data user tidak ditemukan!'
            ], 403);
        }
    }

    public function store(){
        $request = $this->request->getVar();

        $dataInsert = [
            'role_id'  => $request['role_id'],
            // 'siswa_id' => $request['siswa_id'],
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => $this->model->hashPassword($request['password']),
            'is_active' => $request['is_active'],
        ];
        
        if(!$this->model->insert($dataInsert)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menambahkan data ke database!',
                'status' => 400,
                'message' => 'Gagal menambahkan data user!'
            ], 400);
        }

        return $this->respondCreated([
            'error' => null,
            'status' => 201,
            'message' => 'Berhasil menambahkan data user!'
        ], 201);
    }

    public function edit(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id user tidak ditemukan!',
                'status' => 403,
                'message' => 'Id user tidak ditemukan!'
            ], 403);
        }

        $data = $this->model->db->query("SELECT * FROM user WHERE id = ?", [$id])->getRow();

        if($data){
            return $this->respond([
                'data' => $data,
                'status' => 200,
                'message' => 'Berhasil mengambil data user!'
            ], 200);
        } else {
            return $this->respond([
                'data' => null,
                'status' => 403,
                'message' => 'Data user tidak ditemukan!'
            ], 403);
        }
    }

    public function update(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id user tidak ditemukan!',
                'status' => 403,
                'message' => 'Id user tidak ditemukan!'
            ], 403);
        }

        $request = $this->request->getRawInput();

        $dataUpdate = [
            'role_id'  => $request['role_id'] ,
            'siswa_id' => $request['siswa_id'] ?? null,
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => $this->model->hashPassword($request['password']),
            'is_active' => $request['is_active'],
        ];

        if(!$this->model->update($id, $dataUpdate)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal memperbarui data ke database!',
                'status' => 400,
                'message' => 'Gagal memperbarui data user!'
            ], 400);
        }

        return $this->respondUpdated([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil memperbarui data user!'
        ]);
    }

    public function delete(int $id){
        if(!$this->model->find($id)){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Id user tidak ditemukan!',
                'status' => 403,
                'message' => 'Id user tidak ditemukan!'
            ], 403);
        }

        if(!$this->model->db->query("DELETE FROM user WHERE id = ?", [$id])){
            return $this->respond([
                'error' => $this->model->errors() ? $this->model->errors() : 'Gagal menghapus data dari database!',
                'status' => 400,
                'message' => 'Terjadi kesalahan!, Gagal menghapus data user!'
            ], 400);
        }

        return $this->respondDeleted([
            'error' => null,
            'status' => 200,
            'message' => 'Berhasil menghapus data user!'
        ], 200);
    }
}