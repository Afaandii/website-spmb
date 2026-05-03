<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Dokumen extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "pendaftaran_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "jenis_dokumen" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "file_path" => [
                'type' => 'TEXT',
                'null' => true,
            ],
            "status_verifikasi" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "keterangan_dokumen" => [
                'type' => 'TEXT',
                'null' => true,
            ],
            "dibuat_pada" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('pendaftaran_id', 'pendaftaran', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('dokumen');
    }

    public function down()
    {
        $this->forge->dropTable('dokumen');
    }
}