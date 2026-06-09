<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Siswa extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "nik" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => true,
            ],
            "nisn" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => true,
            ],
            "npsn" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => true,
            ],
            "nama_lengkap" => [
                'type'  => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "tempat_lahir" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "tanggal_lahir" => [
                'type' => 'date',
                'null' => true,
            ],
            "jeni_kelamin" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "agama" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "alamat" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "no_telp" => [
                'type' => 'INT',
                'unsigned' => false,
                'null' => false,
            ],
            "latitude" => [
                'type' => 'decimal',
                'constraint' => '9,6',
                'null' => true,
            ],
            "longitude" => [
                'type' => 'decimal',
                'constraint' => '9,6',
                'null' => true,
            ],
            "created_at" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ],
            "updated_at" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('nik');
        $this->forge->addUniqueKey('nisn');
        $this->forge->addUniqueKey('npsn');
        $this->forge->createTable('siswa');
    }

    public function down()
    {
        $this->forge->dropTable('siswa');
    }
}