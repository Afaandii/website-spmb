<?php

namespace App\Models;

use CodeIgniter\Model;

class M_pendaftaran extends Model
{
    protected $table            = 'pendaftaran';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'siswa_id', 
        'sekolah_asal_id', 
        'jalur_id', 
        'tahun_ajaran_id', 
        'kode_registrasi', 
        'status_daftar', 
        'tanggal_daftar', 
        'created_at', 
        'updated_at'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = '';

    // Validation
    protected $validationRules      = [
        'siswa_id' => 'required|integer',
        'jalur_id' => 'required|integer',
        'tahun_ajaran_id' => 'required|integer',
        'kode_registrasi' => 'required|alpha_numeric_space|max_length[100]',
        'status_daftar' => 'required|in_list[proses,diterima,ditolak]'
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
        'kode_registrasi' => [
            'required' => 'Kode registrasi wajib diisi.',
            'alpha_numeric_space' => 'Kode registrasi hanya boleh berisi huruf, angka, dan spasi.',
            'max_length' => 'Kode registrasi tidak boleh lebih dari 100 karakter.'
        ],
        'status_daftar' => [
            'required' => 'Status pendaftaran wajib diisi.',
            'in_list' => 'Status pendaftaran tidak valid.'
        ]
    ];
}