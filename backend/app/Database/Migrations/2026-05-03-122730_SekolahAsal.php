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
            'jenjang_sekolah' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'alamat_sekolah' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "created_at" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ],
            'updated_at' => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('sekolah_asal');
    }

    public function down()
    {
        $this->forge->dropTable('sekolah_asal');
    }
}