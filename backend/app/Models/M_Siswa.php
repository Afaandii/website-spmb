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
        "nik" => 'alpha_numeric_space',
        "nisn" => 'required|alpha_numeric_space',
        "npsn" => 'alpha_numeric_space',
        "nama_lengkap" => 'alpha_numeric_space|min_length[3]|max_length[120]',
        "tempat_lahir" => 'alpha_numeric_space|min_length[3]|max_length[120]',
        "tanggal_lahir" => 'valid_date',
        "jenis_kelamin" => 'in_list[laki-laki,perempuan]',
        "agama" => 'alpha_numeric_space|min_length[3]|max_length[120]',
        "alamat" => 'alpha_numeric_space|min_length[3]|max_length[255]',
        "no_telp" => 'integer|max_length[12]',
        "latitude" => 'numeric',
        "longitude" => 'numeric',
    ];
}