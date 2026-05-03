<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Pendaftaran extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "siswa_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "jalur_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "tahun_ajaran_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "nomor_pendaftaran" => [
                'type' => 'varchar',
                'constraint' => 255,
                'unique' => true,
                'null' => false,
            ],
            "status_pendaftaran" => [
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
        $this->forge->addForeignKey('jalur_id', 'jalur_daftar', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('tahun_ajaran_id', 'tahun_ajaran', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('pendaftaran');
    }

    public function down()
    {
        $this->forge->dropTable('pendaftaran');
    }
}