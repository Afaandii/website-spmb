<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class User extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true
            ],
            'role_id' => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            'siswa_id' => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            'username' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'email' => [
                'type' => 'varchar',
                'constraint' => 255,
                'unique' => true,
                'null' => true,
            ],
            'password' => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            'last_login_at' => [
                'type' => 'timestamp',
                'null' => true,
            ],
            'is_active' => [
                'type' => 'boolean',
                'default' => true,
            ],
            'created_at' => [
                'type' => 'timestamp',
                'default' => new RawSql('CURRENT_TIMESTAMP'),
                "null" => true,
            ],
            'updated_at' => [
                'type' => 'timestamp',
                'default' => new RawSql('CURRENT_TIMESTAMP'),
                "null" => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('role_id', 'role', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->addForeignKey('siswa_id', 'siswa', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('user');
    }

    public function down()
    {
        $this->forge->dropTable('user');
    }
}