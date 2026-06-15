<?php

namespace App\Models;

use CodeIgniter\Model;

class M_data_orang_tua extends Model
{
    protected $table            = 'data_orang_tua';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'siswa_id', 
        'nama_ayah', 
        'pekerjaan_ayah', 
        'penghasilan_ayah',  
        'pendidikan_terakhir_ayah', 
        'nama_ibu', 
        'pekerjaan_ibu', 
        'penghasilan_ibu', 
        'pendidikan_terakhir_ibu', 
        'no_telp_aktif', 
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
        "siswa_id" => 'required|integer',
        "nama_ayah" => 'required|alpha_numeric_space|max_length[120]',
        "pekerjaan_ayah" => 'required|alpha_numeric_space|max_length[120]',
        "penghasilan_ayah" => 'required|alpha_numeric_space|integer|max_length[20]',
        "pendidikan_terakhir_ayah" => 'required|alpha_numeric_space|max_length[120]',
        "nama_ibu" => 'required|alpha_numeric_space|max_length[120]',
        "pekerjaan_ibu" => 'required|alpha_numeric_space|max_length[120]',
        "penghasilan_ibu" => 'required|alpha_numeric_space|integer|max_length[20]',
        "pendidikan_terakhir_ibu" => 'required|alpha_numeric_space|max_length[120]',
        "no_telp_aktif" => 'required|alpha_numeric_space|integer|max_length[12]',
    ];
    protected $validationMessages   = [
        "siswa_id" => [
            "required" => 'ID siswa wajib diisi.',
            "integer" => 'ID siswa harus berupa angka bulat.'
        ],
        "nama_ayah" => [
            "required" => 'Nama ayah wajib diisi.',
            "max_length" => 'Nama ayah maksimal 120 karakter.'
        ],
        "pekerjaan_ayah" => [
            "required" => 'Pekerjaan ayah wajib diisi.',
            "max_length" => 'Pekerjaan ayah maksimal 120 karakter.'
        ],
        "pendidikan_terakhir_ayah" => [
            "required" => 'Pendidikan terakhir ayah wajib diisi.',
            "max_length" => 'Pendidikan terakhir ayah maksimal 120 karakter.'
        ],
        "penghasilan_ayah" => [
            "required" => 'Penghasilan ayah wajib diisi.',
            "integer" => 'Penghasilan ayah harus berupa angka.',
            "max_length" => 'Penghasilan ayah maksimal 20 karakter.'
        ],
        "nama_ibu" => [
            "required" => 'Nama ibu wajib diisi.',
            "max_length" => 'Nama ibu maksimal 120 karakter.'
        ],
        "pekerjaan_ibu" => [
            "required" => 'Pekerjaan ibu wajib diisi.',
            "max_length" => 'Pekerjaan ibu maksimal 120 karakter.'
        ],
        "penghasilan_ibu" => [
            "required" => 'Penghasilan ibu wajib diisi.',
            "integer" => 'Penghasilan ibu harus berupa angka.',
            "max_length" => 'Penghasilan ibu maksimal 20 karakter.'
        ],
        "pendidikan_terakhir_ibu" => [
            "required" => 'Pendidikan terakhir ibu wajib diisi.',
            "max_length" => 'Pendidikan terakhir ibu maksimal 120 karakter.'
        ],
        "no_telp_aktif" => [
            "required" => 'No. telp aktif wajib diisi.',
            "integer" => 'No. telp aktif harus berupa angka.',
            "max_length" => 'No. telp aktif maksimal 30 karakter.'
        ],
    ];
}