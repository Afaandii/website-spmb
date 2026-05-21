<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use Codeigniter\Database\RawSql;

class DataOrangTua extends Migration
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
            "nama_ayah" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "pekerjaan_ayah" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "penghasilan_ayah" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "pendidikan_terakhir_ayah" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "nama_ibu" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "pekerjaan_ibu" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "penghasilan_ibu" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "pendidikan_terakhir_ibu" => [
                'type' => 'varchar',
                'constraint' => 255,
                'null' => true,
            ],
            "no_telp_aktif" => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            "created_at" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
            "updated_at" => [
                'type' => 'timestamp',
                'null' => true,
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('siswa_id', 'siswa', 'id', 'CASCADE', 'RESTRICT');
        $this->forge->createTable('data_orang_tua');
    }

    public function down()
    {
        $this->forge->dropTable('data_orang_tua');
    }
}