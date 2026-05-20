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

    public function getAllSeleksi(){
        $this->select("seleksi as s.*, pendaftaran as p.*, siswa as sw.*, tahun_ajaran as ta.*");
        $this->join("pendaftaran as p", "p.id = s.pendaftaran_id");
        $this->join("siswa as sw", "sw.id = p.siswa_id");
        $this->join("tahun_ajaran as ta", "ta.id = p.tahun_ajaran_id");
        return $this->findAll();
    }

    public function getSeleksiById(int $id){
        $this->select("seleksi as s.*, pendaftaran as p.*, siswa as sw.*, tahun_ajaran as ta.*");
        $this->join("pendaftaran as p", "p.id = s.pendaftaran_id");
        $this->join("siswa as sw", "sw.id = p.siswa_id");
        $this->join("tahun_ajaran as ta", "ta.id = p.tahun_ajaran_id");
        return $this->where("s.id", $id)->first();
    }

    public function insertSeleksi(array $data){
        $this->insert($data);
    }

    public function updateSeleksi(int $id, array $data){
        $this->update($id, $data);
    }

    public function deleteSeleksi(int $id){
        $this->delete($id);
    }
}