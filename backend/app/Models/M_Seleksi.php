<?php

namespace App\Models;

use CodeIgniter\Model;

class M_seleksi extends Model
{
    protected $table            = 'seleksi';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        "pendaftaran_id",
        "nilai_akhir",
        "rangking",
        "jarak_meter",
        "status_seleksi",
        "created_at",
        "updated_at"
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
        "pendaftaran_id" => 'required|integer',
        "nilai_akhir" => 'required|numeric|greater_than_equal_to[0]|less_than_equal_to[100]',
        "rangking" => 'required|integer|min_length[1]',
        "status_seleksi" => 'required|in_list[lulus,gagal]',
        "jarak_meter" => 'required|numeric|greater_than_equal_to[0]'
    ];
    protected $validationMessages   = [
        "pendaftaran_id" => [
            "required" => 'ID pendaftaran wajib diisi.',
            "integer" => 'ID pendaftaran harus berupa angka bulat.'
        ],
        "nilai_akhir" => [
            "required" => 'Nilai akhir wajib diisi.',
            "numeric" => 'Nilai akhir harus berupa angka.',
            "greater_than_equal_to" => 'Nilai akhir tidak boleh kurang dari 0.',
            "less_than_equal_to" => 'Nilai akhir tidak boleh lebih dari 100.'
        ],
        "rangking" => [
            "required" => 'Rangking wajib diisi.',
            "integer" => 'Rangking harus berupa angka bulat.',
            "min_length" => 'Rangking tidak boleh kurang dari 1.'
        ],
        "status_seleksi" => [
            "required" => 'Status seleksi wajib diisi.',
            "in_list" => 'Status seleksi tidak valid.'
        ],
        "jarak_meter" => [
            "required" => 'Jarak meter wajib diisi.',
            "numeric" => 'Jarak meter harus berupa angka.',
            "greater_than_equal_to" => 'Jarak meter tidak boleh kurang dari 0.'
        ]
    ];

}