<?php
namespace App\Models;
use CodeIgniter\Model;


class M_role extends Model{
  protected $table = "role";
  protected $primaryKey = "id";
  protected $useAutoIncrement = true;
  protected $returnType = "array";
  protected $useSoftDeletes = false;
  protected $protectFields = true;
  protected $allowedFields = [
    "nama_role", 
    "deskripsi", 
    "login_destinasi",
    "created_at", 
    "updated_at"
  ];
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
}

?>