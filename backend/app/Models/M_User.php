<?php

namespace App\Models;

use CodeIgniter\Model;

class M_user extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'role_id', 
        'siswa_id', 
        'username', 
        'email', 
        'password', 
        'last_login_at', 
        'is_active',
        'token', 
        'created_at', 
        'updated_at'
    ];

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
        "email" => 'required|valid_email|is_unique[users.email]|max_length[120]',
        "password" => 'required|min_length[6]|max_length[120]',
        "last_login_at" => 'permit_empty|valid_date',
        "is_active" => 'required|in_list[1,2]',
    ];
    protected $validationMessages   = [
        "email" => [
            "is_unique" => 'Email sudah digunakan sebelumnya, mohon gunakan email lain.',
        ],
    ];

    public function hashPassword(string $password)
    {
        if (isset($password)) {
            $data =  password_hash($password, PASSWORD_DEFAULT);
        }
        return $data ?? null;
    }
}