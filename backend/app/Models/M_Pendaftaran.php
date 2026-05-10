<?php

namespace App\Models;

use CodeIgniter\Model;

class M_Pendaftaran extends Model
{
    protected $table            = 'pendaftaran';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['siswa_id', 'jalur_id', 'tahun_ajaran_id', 'nomor_pendaftaran', 'status_pendaftaran', 'dibuat_pada'];

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
        'siswa_id' => 'required|integer',
        'jalur_id' => 'required|integer',
        'tahun_ajaran_id' => 'required|integer',
        'nomor_pendaftaran' => 'required|alpha_numeric_space|max_length[50]',
        'status_pendaftaran' => 'required|in_list[proses,diterima,ditolak]'
    ];
    protected $validationMessages   = [
        'siswa_id' => [
            'required' => 'ID siswa wajib diisi.',
            'integer' => 'ID siswa harus berupa angka bulat.'
        ],
        'jalur_id' => [
            'required' => 'ID jalur pendaftaran wajib diisi.',
            'integer' => 'ID jalur pendaftaran harus berupa angka bulat.'
        ],
        'tahun_ajaran_id' => [
            'required' => 'ID tahun ajaran wajib diisi.',
            'integer' => 'ID tahun ajaran harus berupa angka bulat.'
        ],
        'nomor_pendaftaran' => [
            'required' => 'Nomor pendaftaran wajib diisi.',
            'alpha_numeric_space' => 'Nomor pendaftaran hanya boleh berisi huruf, angka, dan spasi.',
            'max_length' => 'Nomor pendaftaran tidak boleh lebih dari 50 karakter.'
        ],
        'status_pendaftaran' => [
            'required' => 'Status pendaftaran wajib diisi.',
            'in_list' => 'Status pendaftaran tidak valid.'
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