<?php

use CodeIgniter\Model;


class M_role extends Model{
  protected $table = "role";
  protected $primaryKey = "id";
  protected $useAutoIncrement = true;
  protected $returnType = "array";
  protected $useSoftDeletes = false;
  protected $protectFields = true;
  protected $allowedFields = ["nama_role", "deskripsi", "login_destinasi", "created_at", "updated_at"];
  protected $allowEmptyInserts = false;
  protected $updateOnlyChanged = true;
  protected $casts = [];
  protected $castHandlers = [];
  protected $useTimestamps = true;
  protected $dateFormat = "datetime";
  protected $createdField = "created_at";
  protected $updatedField = "updated_at";
  protected $deletedField = "";
  protected $validationRules = [
    'nama_role' => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
    'deskripsi' => 'permit_empty|max_length[255]',
    'login_destinasi' => 'required|alpha_numeric_space|min_length[3]|max_length[120]',
  ];
  protected $validationMessages = [
    'nama_role' => [
      'required' => 'Nama role harus diisi.',
      'alpha_numeric_space' => 'Nama role hanya boleh berisi huruf, angka, dan spasi.',
      'min_length' => 'Nama role minimal 3 karakter.',
      'max_length' => 'Nama role maksimal 120 karakter.',
    ],
  ];
  protected $skipValidation = false;
  protected $cleanValidationRules = true;
  protected $allowCallbacks = true;
  protected $beforeInsert = [];
  protected $afterInsert = [];
  protected $beforeUpdate = [];
  protected $afterUpdate = [];
  protected $beforeFind = [];
  protected $afterFind = [];
  protected $beforeDelete = [];
  protected $afterDelete = [];

  public function getAllRole(){
    return $this->findAll();
  }

  public function getRoleById(int $id){
    return $this->find($id);
  }

  public function createRole(array $data){
    return $this->insert($data);
  }

  public function updateRole(int $id, array $data){
    return $this->update($id, $data);
  }

  public function deleteRole(int $id){
    return $this->delete($id);
  }
}

?>