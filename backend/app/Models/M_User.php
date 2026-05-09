<?php

namespace App\Models;

use CodeIgniter\Model;

class M_User extends Model
{
    protected $table            = 'user';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = ['array', 'object'];
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['role_id', 'username', 'email', 'password', 'dibuat_pada'];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'dibuat_pada';
    protected $updatedField  = '';
    protected $deletedField  = '';

    // Validation
    protected $validationRules      = [
        "role_id" => 'required|integer',
        "username" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "email" => 'required|valid_email|is_unique[user.email]|max_length[120]',
        "password" => 'required|min_length[6]|max_length[120]',
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