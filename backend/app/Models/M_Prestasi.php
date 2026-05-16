<?php

namespace App\Models;

use CodeIgniter\Model;

class M_prestasi extends Model
{
    protected $table            = 'prestasi';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ["pendaftaran_id", "nama_prestasi", "jenis_prestasi", "tingkat_lomba", "keterangan_prestasi", "skor_tambahan", "sertifikat_path", "diverifikasi_oleh", "status_validasi", "tanggal_validasi", "created_at", "updated_at"];

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
        "nama_prestasi" => 'required|string|max_length[255]',
        "jenis_prestasi" => 'required|string|max_length[255]',
        "tingkat_lomba" => 'required|string|max_length[255]',
        "keterangan_prestasi" => 'permit_empty|string|max_length[255]',
        "skor_tambahan" => 'required|numeric|greater_than_equal_to[0]',
        "sertifikat_path" => 'permit_empty|string|max_length[255]',
        "diverifikasi_oleh" => 'permit_empty|integer',
        "status_validasi" => 'permit_empty|in_list[belum diverifikasi,valid,tidak valid]',
        "tanggal_validasi" => 'permit_empty|valid_date'
    ];
    protected $validationMessages   = [];
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

    public function getAllPrestasi(){
        $this->select('prestasi.*, pendaftaran.siswa_id');
        $this->join('pendaftaran', 'prestasi.pendaftaran_id = pendaftaran.id');
        return $this->findAll();
    }

    public function getPrestasiById(int $id){
        $this->select('prestasi.*, pendaftaran.siswa_id');
        $this->join('pendaftaran', 'prestasi.pendaftaran_id = pendaftaran.id');
        return $this->find($id);
    }

    public function getPrestasiBySiswaId(int $siswa_id){
        $this->select('prestasi.*, pendaftaran.siswa_id');
        $this->join('pendaftaran', 'prestasi.pendaftaran_id = pendaftaran.id');
        return $this->where('pendaftaran.siswa_id', $siswa_id)->findAll();
    }

    public function insertPrestasi(array $data){
        $this->insert($data);
    }

    public function updatePrestasi(int $id, array $data){
        $this->update($id, $data);
    }

     public function deletePrestasi(int $id){
         $this->delete($id);
     }
}