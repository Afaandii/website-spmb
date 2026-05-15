<?php

namespace App\Models;

use CodeIgniter\Model;

class M_user extends Model
{
    protected $table            = 'user';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['role_id', 'siswa_id', 'username', 'email', 'password', 'last_login_at', 'is_active', 'created_at', 'updated_at'];

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
        "role_id" => 'required|integer',
        "siswa_id" => 'permit_empty|integer',
        "username" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "email" => 'required|valid_email|is_unique[user.email]|max_length[120]',
        "password" => 'required|min_length[6]|max_length[120]',
        "last_login_at" => 'permit_empty|valid_date',
        "is_active" => 'required|in_list[1,2]',
    ];
    protected $validationMessages   = [
        "email" => [
            "is_unique" => 'Email sudah digunakan sebelumnya, mohon gunakan email lain.',
        ],
    ];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = ['hashPassword'];
    protected $afterInsert    = [];
    protected $beforeUpdate   = ['hashPassword'];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];


    public function hashPassword(array $data)
    {
        if (isset($data['data']['password'])) {
            $data['data']['password'] = password_hash($data['data']['password'], PASSWORD_DEFAULT);
        }
        return $data;
    }

    public function getAllUser(){
        $this->select('user.*, role.nama_role');
        $this->join('role', 'role.id = user.role_id');
        return $this->findAll();
    }
}