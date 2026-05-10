<?php

namespace App\Models;

use CodeIgniter\Model;

class M_Detail_siswa extends Model
{
    protected $table            = 'detail_siswa';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['siswa_id', 'nama_ayah', 'pekerjaan_ayah', 'pendidikan_ayah', 'penghasilan_ayah', 'pendidikan_terakhir', 'nama_ibu', 'pekerjaan_ibu', 'penghasilan_ibu', 'pendidikan_terakhir', 'no_telp_aktif', 'dibuat_pada'];

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
        "siswa_id" => 'required|integer',
        "nama_ayah" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "pekerjaan_ayah" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "pendidikan_ayah" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "penghasilan_ayah" => 'required|alpha_numeric_space|integer|min_length[3]|max_length[20]',
        "nama_ibu" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "pekerjaan_ibu" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "penghasilan_ibu" => 'required|alpha_numeric_space|integer|min_length[3]|max_length[20]',
        "no_telp_aktif" => 'required|alpha_numeric_space|integer|min_length[3]|max_length[30]',
    ];
    protected $validationMessages   = [
        "siswa_id" => [
            "required" => 'ID siswa wajib diisi.',
            "integer" => 'ID siswa harus berupa angka bulat.'
        ],
        "nama_ayah" => [
            "required" => 'Nama ayah wajib diisi.',
            "min_length" => 'Nama ayah minimal 3 karakter.',
            "max_length" => 'Nama ayah maksimal 120 karakter.'
        ],
        "pekerjaan_ayah" => [
            "required" => 'Pekerjaan ayah wajib diisi.',
            "min_length" => 'Pekerjaan ayah minimal 3 karakter.',
            "max_length" => 'Pekerjaan ayah maksimal 120 karakter.'
        ],
        "pendidikan_ayah" => [
            "required" => 'Pendidikan ayah wajib diisi.',
            "min_length" => 'Pendidikan ayah minimal 3 karakter.',
            "max_length" => 'Pendidikan ayah maksimal 120 karakter.'
        ],
        "penghasilan_ayah" => [
            "required" => 'Penghasilan ayah wajib diisi.',
            "integer" => 'Penghasilan ayah harus berupa angka.',
            "min_length" => 'Penghasilan ayah minimal 3 karakter.',
            "max_length" => 'Penghasilan ayah maksimal 20 karakter.'
        ],
        "nama_ibu" => [
            "required" => 'Nama ibu wajib diisi.',
            "min_length" => 'Nama ibu minimal 3 karakter.',
            "max_length" => 'Nama ibu maksimal 120 karakter.'
        ],
        "pekerjaan_ibu" => [
            "required" => 'Pekerjaan ibu wajib diisi.',
            "min_length" => 'Pekerjaan ibu minimal 3 karakter.',
            "max_length" => 'Pekerjaan ibu maksimal 120 karakter.'
        ],
        "penghasilan_ibu" => [
            "required" => 'Penghasilan ibu wajib diisi.',
            "integer" => 'Penghasilan ibu harus berupa angka.',
            "min_length" => 'Penghasilan ibu minimal 3 karakter.',
            "max_length" => 'Penghasilan ibu maksimal 20 karakter.'
        ],
        "no_telp_aktif" => [
            "required" => 'No. telp aktif wajib diisi.',
            "integer" => 'No. telp aktif harus berupa angka.',
            "min_length" => 'No. telp aktif minimal 3 karakter.',
            "max_length" => 'No. telp aktif maksimal 30 karakter.'
        ],
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