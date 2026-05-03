<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class SekolahAsal extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "siswa_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            'npsn' => [
                'type' => 'varchar',
                'constraint' => 255,
                'unique' => true,
                'null' => true,
            ],
            'nama_sekolah' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'alamat_sekolah' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "tingkat_sekolah" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "dibuat_pada" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('siswa_id', 'siswa', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('sekolah_asal');
    }

    public function down()
    {
        $this->forge->dropTable('sekolah_asal');
    }
}