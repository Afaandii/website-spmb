<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Seleksi extends Migration
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
            "nilai_akhir" => [
                'type' => 'INT',
                'null' => true,
            ],
            "rangking" => [
                'type' => 'INT',
                'null' => true,
            ],
            "jarak_meter" => [
                'type' => 'INT',
                'null' => true,
            ],
            "status_seleksi" => [
                'type' => 'varchar',
                'constraint' => 255,
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
        $this->forge->addForeignKey('pendaftaran_id', 'pendaftaran', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('seleksi');
    }

    public function down()
    {
        $this->forge->dropTable('seleksi');
    }
}