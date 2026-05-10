<?php

namespace App\Models;

use CodeIgniter\Model;

class M_Seleksi extends Model
{
    protected $table            = 'seleksi';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ["pendaftaran_id", "nilai_seleksi", "rangkis", "status_seleksi", "jarak_meter", "dibuat_pada"];

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
        "pendaftaran_id" => 'required|integer',
        "nilai_seleksi" => 'required|numeric|greater_than_equal_to[0]|less_than_equal_to[100]',
        "rangkis" => 'required|in_list[ya,tidak]',
        "status_seleksi" => 'required|in_list[lulus,gagal]',
        "jarak_meter" => 'required|numeric|greater_than_equal_to[0]'
    ];
    protected $validationMessages   = [
        "pendaftaran_id" => [
            "required" => 'ID pendaftaran wajib diisi.',
            "integer" => 'ID pendaftaran harus berupa angka bulat.'
        ],
        "nilai_seleksi" => [
            "required" => 'Nilai seleksi wajib diisi.',
            "numeric" => 'Nilai seleksi harus berupa angka.',
            "greater_than_equal_to" => 'Nilai seleksi tidak boleh kurang dari 0.',
            "less_than_equal_to" => 'Nilai seleksi tidak boleh lebih dari 100.'
        ],
        "rangkis" => [
            "required" => 'Rangkis wajib diisi.',
            "in_list" => 'Rangkis tidak valid.'
        ],
        "status_seleksi" => [
            "required" => 'Status seleksi wajib diisi.',
            "in_list" => 'Status seleksi tidak valid.'
        ],
        "jarak_meter" => [
            "required" => 'Jarak meter wajib diisi.',
            "numeric" => 'Jarak meter harus berupa angka.',
            "greater_than_equal_to" => 'Jarak meter tidak boleh kurang dari 0.'
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
}