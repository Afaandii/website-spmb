<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Prestasi extends Migration
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
            "nama_prestasi" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "jenis_prestasi" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "tingkat_lomba" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "keterangan_prestasi" => [
                'type' => 'TEXT',
                'null' => true,
            ],
            "skor_tambahan" => [
                'type' => 'INT',
                'null' => true,
            ],
            "sertifikat_path" => [
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
        $this->forge->createTable('prestasi');
    }

    public function down()
    {
        $this->forge->dropTable('prestasi');
    }
}