<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Pengumuman extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "jalur_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "dibuat_oleh" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "tahun_ajaran_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "title" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "slug" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "deskripsi" => [
                'type' => 'TEXT',
                'null' => true,
            ],
            "tipe_pengumuman" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "status_pengumuman" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "tanggal_publish" => [
                'type' => 'date',
                'null' => true,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('jalur_id', 'jalur_daftar', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('dibuat_oleh', 'user', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('tahun_ajaran_id', 'tahun_ajaran', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('pengumuman');
    }

    public function down()
    {
        $this->forge->dropTable('pengumuman');
    }
}