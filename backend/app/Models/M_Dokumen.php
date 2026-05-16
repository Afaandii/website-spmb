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
    protected $allowedFields    = ["pendaftaran_id", "jenis_dokumen", "file_path", "status_verifikasi", "keterangan_dokumen", "mimes_type", "ukuran_file", "created_at","updated_at"];

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
        "jenis_dokumen" => 'required|in_list[ijazah,skhu,akte_kelahiran,foto]',
        "file_path" => 'required|string|max_length[255]',
        "status_verifikasi" => 'required|in_list[belum diverifikasi,terverifikasi,ditolak]',
        "keterangan_dokumen" => 'permitted|string|max_length[255]',
        "mimes_type" => 'permitted|string|max_length[255]',
        "ukuran_file" => 'permitted|integer'
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

    public function getAllDokumen(){
        $this->select('dokumen.*, pendaftaran.siswa_id');
        $this->join('pendaftaran', 'dokumen.pendaftaran_id = pendaftaran.id');
        return $this->findAll();
    }

    public function getDokumenById(int $id){
        $this->select('dokumen.*, pendaftaran.siswa_id');
        $this->join('pendaftaran', 'dokumen.pendaftaran_id = pendaftaran.id');
        return $this->find($id);
    }

    public function getDokumenBySiswaId(int $siswa_id){
        $this->select('dokumen.*, pendaftaran.siswa_id');
        $this->join('pendaftaran', 'dokumen.pendaftaran_id = pendaftaran.id');
        return $this->where('pendaftaran.siswa_id', $siswa_id)->findAll();
    }

    public function insertDokumen(array $data){
        $this->insert($data);
    }

    public function updateDokumen(int $id, array $data){
        $this->update($id, $data);
    }

     public function deleteDokumen(int $id){
         $this->delete($id);
     }
}