<?php

namespace App\Models;

use CodeIgniter\Model;

class M_sekolah_asal extends Model
{
    protected $table            = 'sekolah_asal';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['npsn', 'nama_sekolah', 'jenjang_sekolah', 'alamat_sekolah', 'created_at', 'updated_at'];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = '';

    // Validation
    protected $validationRules      = [
        'npsn' => 'required|numeric|exact_length[10]|is_unique[sekolah_asal.npsn]',
        'nama_sekolah' => 'required|alpha_numeric_space|max_length[100]',
        'alamat_sekolah' => 'required|max_length[255]',
        'jenjang_sekolah' => 'required|in_list[SD,SMP,SMA]'
    ];
    protected $validationMessages   = [
        'npsn' => [
            'required' => 'NPSN wajib diisi.',
            'numeric' => 'NPSN harus berupa angka.',
            'exact_length' => 'NPSN harus terdiri dari 10 karakter.',
            'is_unique' => 'NPSN sudah digunakan, mohon gunakan NPSN lain.'
        ],
        'nama_sekolah' => [
            'required' => 'Nama sekolah wajib diisi.',
            'alpha_numeric_space' => 'Nama sekolah hanya boleh berisi huruf, angka, dan spasi.',
            'max_length' => 'Nama sekolah tidak boleh lebih dari 100 karakter.'
        ],
        'alamat_sekolah' => [
            'required' => 'Alamat sekolah wajib diisi.',
            'max_length' => 'Alamat sekolah tidak boleh lebih dari 255 karakter.'
        ],
        'jenjang_sekolah' => [
            'required' => 'Jenjang sekolah wajib diisi.',
            'in_list' => 'Jenjang sekolah tidak valid.'
        ]
    ];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function getAllSekolahAsal(){
        $this->select("sekolah_asal as sa.*");
        return $this->findAll();
    }

    public function getSekolahAsalById(int $id){
        $this->select("sekolah_asal as sa.*");
        return $this->where("sa.id", $id)->first();
    }

    public function insertSekolahAsal(array $data){
        $this->insert($data);
    }

    public function updateSekolahAsal(int $id, array $data){
        $this->update($id, $data);
    }

    public function deleteSekolahAsal(int $id){
        $this->delete($id);
    }
}