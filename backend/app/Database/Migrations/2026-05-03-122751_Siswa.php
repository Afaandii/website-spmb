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
                'type' => 'varchar',
                'constraint' => 255,
                'unique' => true,
                'null' => true,
            ],
            "nisn" => [
                'type' => 'varchar',
                'constraint' => 255,
                'unique' => true,
                'null' => true,
            ],
            "npsn" => [
                'type' => 'varchar',
                'constraint' => 255,
                'unique' => true,
                'null' => true,
            ],
            "nama_lengkap" => [
                'type'  => 'varchar',
                'contraint' => 255,
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
                'unsigned' => true,
                'null' => false,
            ],
            "latitude" => [
                'type' => 'decimal',
                'constraint' => '10,8',
                'null' => true,
            ],
            "longlatitude" => [
                'type' => 'decimal',
                'constraint' => '10,8',
                'null' => true,
            ],
            "dibuat_pada" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('siswa');
    }

    public function down()
    {
        $this->forge->dropTable('siswa');
    }
}