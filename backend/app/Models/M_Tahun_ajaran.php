<?php

namespace App\Models;

use CodeIgniter\Model;

class M_tahun_ajaran extends Model
{
    protected $table            = 'tahun_ajaran';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['tahun', 'status', 'created_at', 'updated_at'];

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
        'tahun' => 'required|numeric|exact_length[4]|is_unique[tahun_ajaran.tahun]',
        'status' => 'required|in_list[Aktif,Tidak Aktif]'
    ];
    protected $validationMessages   = [
        'tahun' => [
            'required' => 'Tahun wajib diisi.',
            'numeric' => 'Tahun harus berupa angka.',
            'exact_length' => 'Tahun harus terdiri dari 4 karakter.',
            'is_unique' => 'Tahun sudah digunakan, mohon gunakan tahun lain.'
        ],
        'status' => [
            'required' => 'Status wajib diisi.',
            'in_list' => 'Status tidak valid.'
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


    public function getAllTahunAjaran(){
        $this->select("tahun_ajaran as ta.*");
        return $this->findAll();
    }

    public function getTahunAjaranById(int $id){
        $this->select("tahun_ajaran as ta.*");
        return $this->where("ta.id", $id)->first();
    }

    public function insertTahunAjaran(array $data){
        $this->insert($data);
    }

    public function updateTahunAjaran(int $id, array $data){
        $this->update($id, $data);
    }

    public function deleteTahunAjaran(int $id){
        $this->delete($id);
    }
}