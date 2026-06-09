<?php

namespace App\Models;

use CodeIgniter\Model;

class M_sekolah_asal extends Model
{
    protected $table            = 'sekolah_asal';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
     'npsn',
     'nama_sekolah', 
     'jenjang_sekolah',
     'alamat_sekolah',
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
        'npsn' => 'required|numeric|exact_length[10]',
        'nama_sekolah' => 'required|max_length[100]',
        'alamat_sekolah' => 'required|max_length[255]',
        'jenjang_sekolah' => 'required|in_list[SD,MI,SMP,MTS,SMA,SMK,MA]',
    ];
    protected $validationMessages   = [
        'npsn' => [
            'required' => 'NPSN wajib diisi.',
            'numeric' => 'NPSN harus berupa angka.',
            'exact_length' => 'NPSN harus terdiri dari 10 karakter.',
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
        'jenjang_sekolah' => [
            'required' => 'Jenjang sekolah wajib diisi.',
            'in_list' => 'Jenjang sekolah tidak valid.'
        ]
    ];
}