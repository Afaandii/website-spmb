<?php

namespace App\Models;

use CodeIgniter\Model;

class M_jalur_daftar extends Model
{
    protected $table            = 'jalur_daftar';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'nama_jalur', 
        'tipe_seleksi', 
        'kuota', 
        'metode_perankingan', 
        'tanggal_mulai', 
        'tanggal_selesai', 
        'is_active', 
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
        'nama_jalur' => 'required|alpha_numeric_space|max_length[100]',
        'tipe_seleksi' => 'required|max_length[50]',
        'kuota' => 'required|integer',
        'metode_perankingan' => 'required|max_length[100]',
        'tanggal_mulai' => 'required|valid_date',
        'tanggal_selesai' => 'required|valid_date',
        'is_active' => 'required|in_list[1,2]'
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
        'metode_perankingan' => [
            'required' => 'Metode perankingan wajib diisi.',
            'max_length' => 'Metode perankingan tidak boleh lebih dari 100 karakter.'
        ],
        'tanggal_mulai' => [
            'required' => 'Tanggal mulai wajib diisi.',
            'valid_date' => 'Tanggal mulai tidak valid.'
        ],
        'tanggal_selesai' => [
            'required' => 'Tanggal selesai wajib diisi.',
            'valid_date' => 'Tanggal selesai tidak valid.',
        ],
        'is_active' => [
            'required' => 'Status aktif wajib diisi.',
            'in_list' => 'Status aktif tidak valid.'
        ]
    ];
}