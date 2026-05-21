<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Akademik extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "pendafataran_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "tahun_ajaran_id" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "semester" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "nilai_rata_rata" => [
                'type' => 'DECIMAL',
                'constraint' => '5,2',
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
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('pendafataran_id', 'pendaftaran', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('tahun_ajaran_id', 'tahun_ajaran', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('akademik');
    }

    public function down()
    {
        $this->forge->dropTable('akademik');
    }
}