<?php

namespace App\Models;

use CodeIgniter\Model;

class M_Pengumuman extends Model
{
    protected $table            = 'pengumuman';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['jalur_id', 'dibuat_oleh', 'tahun_ajaran_id', 'title', 'slug', 'deskripsi', 'tipe_pengumuman', 'status_pengumuman', 'tanggal_publish'];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'tanggal_publish';
    protected $updatedField  = '';
    protected $deletedField  = '';

    // Validation
    protected $validationRules      = [
        "jalur_id" => 'required|integer',
        "dibuat_oleh" => 'required|integer',
        "tahun_ajaran_id" => 'required|integer',
        "title" => 'required|alpha_numeric_space|min_length[3]|max_length[255]',
        "slug" => 'required|alpha_numeric_dash|min_length[3]|max_length[255]|is_unique[pengumuman.slug]',
        "deskripsi" => 'required|alpha_numeric_space|min_length[3]',
        "tipe_pengumuman" => 'required|in_list[umum,khusus]',
        "status_pengumuman" => 'required|in_list[draft,publish]'
    ];
    protected $validationMessages   = [
        "jalur_id" => [
            "required" => 'ID jalur pendaftaran wajib diisi.',
            "integer" => 'ID jalur pendaftaran harus berupa angka bulat.'
        ],
        "dibuat_oleh" => [
            "required" => 'ID pembuat pengumuman wajib diisi.',
            "integer" => 'ID pembuat pengumuman harus berupa angka bulat.'
        ],
        "tahun_ajaran_id" => [
            "required" => 'ID tahun ajaran wajib diisi.',
            "integer" => 'ID tahun ajaran harus berupa angka bulat.'
        ],
        "title" => [
            "required" => 'Judul pengumuman wajib diisi.',
            "min_length" => 'Judul pengumuman minimal 3 karakter.',
            "max_length" => 'Judul pengumuman maksimal 255 karakter.'
        ],
        "slug" => [
            "required" => 'Slug pengumuman wajib diisi.',
            "alpha_numeric_dash" => 'Slug pengumuman hanya boleh berisi huruf, angka, dan tanda hubung.',
            "min_length" => 'Slug pengumuman minimal 3 karakter.',
            "max_length" => 'Slug pengumuman maksimal 255 karakter.',
            "is_unique" => 'Slug pengumuman sudah digunakan sebelumnya, mohon gunakan slug lain.'
        ],
        "deskripsi" => [
            "required" => 'Deskripsi pengumuman wajib diisi.',
            "min_length" => 'Deskripsi pengumuman minimal 3 karakter.'
        ],
        "tipe_pengumuman" => [
            "required" => 'Tipe pengumuman wajib diisi.',
            "in_list" => 'Tipe pengumuman tidak valid.'
        ],
        "status_pengumuman" => [
            "required" => 'Status pengumuman wajib diisi.',
            "in_list" => 'Status pengumuman tidak valid.'
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