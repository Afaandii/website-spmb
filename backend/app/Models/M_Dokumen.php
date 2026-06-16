<?php

namespace App\Models;

use CodeIgniter\Model;

class M_dokumen extends Model
{
    protected $table            = 'dokumen';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        "pendaftaran_id", 
        "jenis_dokumen", 
        "file_path", 
        "status_verifikasi", 
        "keterangan_dokumen", 
        "mimes_type", 
        "ukuran_file", 
        "created_at",
        "updated_at"
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = '';

    // Validation
    protected $validationRules      = [
        "pendaftaran_id" => 'required|integer',
        "jenis_dokumen" => 'required|in_list[ijazah,sktm,akte_kelahiran]',
        "file_path" => 'required|string|max_length[255]',
        "status_verifikasi" => 'required|in_list[belum diverifikasi,terverifikasi,ditolak]',
        "keterangan_dokumen" => 'string|max_length[255]',
        "mimes_type" => 'string|max_length[255]',
        "ukuran_file" => 'integer'
    ];
    protected $validationMessages   = [
        "pendaftaran_id" => [
            "required" => 'ID pendaftaran wajib diisi.',
            "integer" => 'ID pendaftaran harus berupa angka bulat.'
        ],
        "jenis_dokumen" => [
            "required" => 'Jenis dokumen wajib diisi.',
            "in_list" => 'Jenis dokumen tidak valid.'
        ],
        "file_path" => [
            "required" => 'File path wajib diisi.',
            "string" => 'File path harus berupa string.',
            "max_length" => 'File path tidak boleh lebih dari 255 karakter.'
        ],
        "status_verifikasi" => [
            "required" => 'Status verifikasi wajib diisi.',
            "in_list" => 'Status verifikasi tidak valid.'
        ],
        "keterangan_dokumen" => [
            "string" => 'Keterangan dokumen harus berupa string.',
            "max_length" => 'Keterangan dokumen tidak boleh lebih dari 255 karakter.'
        ],
        "mimes_type" => [
            "string" => 'Mimes type harus berupa string.',
            "max_length" => 'Mimes type tidak boleh lebih dari 255 karakter.'
        ],
        "ukuran_file" => [
            "integer" => 'Ukuran file harus berupa angka bulat.'
        ]
    ];
}