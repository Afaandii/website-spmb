<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class JalurDaftar extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'nama_jalur' =>[
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'tipe_seleksi' => [
                'type' => 'varchar',
                'constraint' =>255,
                'null' => true,
            ],
            'kuota' => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => true,
            ],
            'metode_perankingan' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'tanggal_mulai' => [
                'type' => 'date',
                'null' => true,
            ],
            'tanggal_selesai' => [
                'type' => 'date',
                'null' => true,
            ],
            'is_active' => [
                'type' => 'boolean',
                'default' => true,
            ],
            'created_at' => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
            'updated_at' => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('jalur_daftar');
    }

    public function down()
    {
        $this->forge->dropTable('jalur_daftar');
    }
}