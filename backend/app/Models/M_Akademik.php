<?php

namespace App\Models;

use CodeIgniter\Model;

class M_akademik extends Model
{
    protected $table            = 'akademik';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'pendaftaran_id', 
        'tahun_ajaran_id', 
        'semester', 
        'nilai_rata_rata', 
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
        "pendaftaran_id" => 'required|integer',
        "tahun_ajaran_id" => 'required|integer',
        "semester" => 'required|in_list[ganjil,genap]',
        "nilai_rata_rata" => 'required|numeric|greater_than_equal_to[0]|less_than_equal_to[100]'
    ];
    protected $validationMessages   = [
        "pendaftaran_id" => [
            "required" => 'ID pendaftaran wajib diisi.',
            "integer" => 'ID pendaftaran harus berupa angka bulat.'
        ],
        "tahun_ajaran_id" => [
            "required" => 'ID tahun ajaran wajib diisi.',
            "integer" => 'ID tahun ajaran harus berupa angka bulat.'
        ],
        "semester" => [
            "required" => 'Semester wajib diisi.',
            "in_list" => 'Semester tidak valid.'
        ],
        "nilai_rata_rata" => [
            "required" => 'Nilai rata-rata wajib diisi.',
            "numeric" => 'Nilai rata-rata harus berupa angka.',
            "greater_than_equal_to" => 'Nilai rata-rata tidak boleh kurang dari 0.',
            "less_than_equal_to" => 'Nilai rata-rata tidak boleh lebih dari 100.'
        ]
    ];
}