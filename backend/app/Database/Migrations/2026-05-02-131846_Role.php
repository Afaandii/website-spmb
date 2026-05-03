<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class Role extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true
            ],
            'nama_role' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'deskripsi' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'login_destinasi' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'dibuat_pada' => [
                'type' => 'timestamp',
                'default' => new RawSql('CURRENT_TIMESTAMP'),
                'null' => true,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('role');
    }

    public function down()
    {
        $this->forge->dropTable('role');
    }
}