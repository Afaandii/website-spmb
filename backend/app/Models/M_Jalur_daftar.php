<?php

namespace App\Models;

use CodeIgniter\Model;

class M_Jalur_daftar extends Model
{
    protected $table            = 'jalur_daftar';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['nama_jalur', 'tipe_seleksi', 'kuota', 'deskripsi', 'dibuat_pada'];

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
        'nama_jalur' => 'required|alpha_numeric_space|max_length[100]',
        'tipe_seleksi' => 'required|max_length[50]',
        'kuota' => 'required|integer',
        'deskripsi' => 'max_length[255]'
    ];
    protected $validationMessages   = [
        'nama_jalur' => [
            'required' => 'Nama jalur pendaftaran wajib diisi.',
            'alpha_numeric_space' => 'Nama jalur pendaftaran hanya boleh berisi huruf, angka, dan spasi.',
            'max_length' => 'Nama jalur pendaftaran tidak boleh lebih dari 100 karakter.'
        ],
        'tipe_seleksi' => [
            'required' => 'Tipe seleksi wajib diisi.',
            'max_length' => 'Tipe seleksi tidak boleh lebih dari 50 karakter.'
        ],
        'kuota' => [
            'required' => 'Kuota wajib diisi.',
            'integer' => 'Kuota harus berupa angka bulat.'
        ],
        'deskripsi' => [
            'max_length' => 'Deskripsi tidak boleh lebih dari 255 karakter.'
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