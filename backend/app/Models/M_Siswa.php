<?php

namespace App\Models;

use CodeIgniter\Model;

class M_siswa extends Model
{
    protected $table            = 'siswa';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'nik', 
        'nisn', 
        'npsn', 
        'nama_lengkap', 
        'tempat_lahir', 
        'tanggal_lahir', 
        'jenis_kelamin', 
        'agama', 
        'alamat', 
        'no_telp', 
        'latitude', 
        'longitude', 
        'created_at', 
        'updated_at'
    ];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = '';

    // Validation
    protected $validationRules      = [
        "nik" => 'required|alpha_numeric_space',
        "nisn" => 'required|alpha_numeric_space',
        "npsn" => 'required|alpha_numeric_space',
        "nama_lengkap" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "tempat_lahir" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "tanggal_lahir" => 'required|valid_date',
        "jenis_kelamin" => 'required|in_list[Laki-laki,Perempuan]',
        "agama" => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
        "alamat" => 'required|alpha_numeric_space|min_length[3]|max_length[255]',
        "no_telp" => 'required|alpha_numeric_space|integer|min_length[3]|max_length[20]',
        "latitude" => 'required|numeric',
        "longitude" => 'required|numeric',
    ];
}