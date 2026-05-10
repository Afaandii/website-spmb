<?php

namespace App\Models;

use CodeIgniter\Model;

class M_Sekolah_asal extends Model
{
    protected $table            = 'sekolah_asal';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['siswa_id', 'npsn', 'nama_sekolah', 'alamat_sekolah', 'tingkat_sekolah', 'dibuat_pada'];

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
        'npsn' => 'required|numeric|exact_length[10]|is_unique[sekolah_asal.npsn]',
        'nama_sekolah' => 'required|alpha_numeric_space|max_length[100]',
        'alamat_sekolah' => 'required|max_length[255]',
        'tingkat_sekolah' => 'required|in_list[SD,SMP,SMA]'
    ];
    protected $validationMessages   = [
        'siswa_id' => [
            'required' => 'ID siswa wajib diisi.',
            'integer' => 'ID siswa harus berupa angka bulat.'
        ],
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
        'tingkat_sekolah' => [
            'required' => 'Tingkat sekolah wajib diisi.',
            'in_list' => 'Tingkat sekolah tidak valid.'
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