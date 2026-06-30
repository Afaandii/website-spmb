<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
  $routes->group('v1', function($routes){
    // auth routing
    $routes->post('auth/login', 'auth\Auth::login');
    $routes->post('auth/register', 'auth\Auth::register');
    $routes->post('auth/logout', 'auth\Auth::logout');

    // Roles routing
    $routes->get('role', 'role\Role::index');
    $routes->get('role/(:num)', 'role\Role::show/$1');
    $routes->post('role', 'role\Role::store');
    $routes->put('role/(:num)', 'role\Role::update/$1');
    $routes->delete('role/(:num)', 'role\Role::delete/$1');

    // User Routing
    $routes->get('user', 'user\User::index');
    $routes->get('user/(:num)', 'user\User::show/$1');
    $routes->post('user', 'user\User::store');
    $routes->put('user/(:num)', 'user\User::update/$1');
    $routes->delete('user/(:num)', 'user\User::delete/$1');

    // Tahun Ajaran Routing
    $routes->get('tahun-ajaran', 'tahun_ajaran\TahunAjaran::index');
    $routes->get('tahun-ajaran/(:num)', 'tahun_ajaran\TahunAjaran::show/$1');
    $routes->post('tahun-ajaran', 'tahun_ajaran\TahunAjaran::store');
    $routes->put('tahun-ajaran/(:num)', 'tahun_ajaran\TahunAjaran::update/$1');
    $routes->delete('tahun-ajaran/(:num)', 'tahun_ajaran\TahunAjaran::delete/$1');

    // Siswa Routing
    $routes->get('siswa', 'siswa\Siswa::index');
    $routes->get('siswa/(:num)', 'siswa\Siswa::show/$1');
    $routes->post('siswa', 'siswa\Siswa::store');
    $routes->put('siswa/(:num)', 'siswa\Siswa::update/$1');
    $routes->delete('siswa/(:num)', 'siswa\Siswa::delete/$1');

    // Seleksi Routing
    $routes->get('seleksi', 'seleksi\Seleksi::index');
    $routes->get('seleksi/(:num)', 'seleksi\Seleksi::show/$1');
    $routes->post('seleksi', 'seleksi\Seleksi::store');
    $routes->put('seleksi/(:num)', 'seleksi\Seleksi::update/$1');
    $routes->delete('seleksi/(:num)', 'seleksi\Seleksi::delete/$1');

    // Sekolah Asal Routing
    $routes->get('sekolah-asal', 'sekolah_asal\SekolahAsal::index');
    $routes->get('sekolah-asal/(:num)', 'sekolah_asal\SekolahAsal::show/$1');
    $routes->post('sekolah-asal', 'sekolah_asal\SekolahAsal::store');
    $routes->put('sekolah-asal/(:num)', 'sekolah_asal\SekolahAsal::update/$1');
    $routes->delete('sekolah-asal/(:num)', 'sekolah_asal\SekolahAsal::delete/$1');

    // Prestasi Routing
    $routes->get('prestasi', 'prestasi\Prestasi::index');
    $routes->get('prestasi/(:num)', 'prestasi\Prestasi::show/$1');
    $routes->post('prestasi', 'prestasi\Prestasi::store');
    $routes->put('prestasi/(:num)', 'prestasi\Prestasi::update/$1');
    $routes->delete('prestasi/(:num)', 'prestasi\Prestasi::delete/$1');

    // Pengumuman Routing
    $routes->get('pengumuman', 'pengumuman\Pengumuman::index');
    $routes->get('pengumuman/(:num)', 'pengumuman\Pengumuman::show/$1');
    $routes->post('pengumuman', 'pengumuman\Pengumuman::store');
    $routes->put('pengumuman/(:num)', 'pengumuman\Pengumuman::update/$1');
    $routes->delete('pengumuman/(:num)', 'pengumuman\Pengumuman::delete/$1');

    // Jalur Daftar Routing
    $routes->get('jalur-daftar', 'jalur_daftar\JalurDaftar::index');
    $routes->get('jalur-daftar/(:num)', 'jalur_daftar\JalurDaftar::show/$1');
    $routes->post('jalur-daftar', 'jalur_daftar\JalurDaftar::store');
    $routes->put('jalur-daftar/(:num)', 'jalur_daftar\JalurDaftar::update/$1');
    $routes->delete('jalur-daftar/(:num)', 'jalur_daftar\JalurDaftar::delete/$1');

    // Pendaftaran Routing
    $routes->get('pendaftaran', 'pendaftaran\Pendaftaran::index');
    $routes->get('pendaftaran/(:num)', 'pendaftaran\Pendaftaran::show/$1');
    $routes->post('pendaftaran', 'pendaftaran\Pendaftaran::store');
    $routes->put('pendaftaran/(:num)', 'pendaftaran\Pendaftaran::update/$1');
    $routes->delete('pendaftaran/(:num)', 'pendaftaran\Pendaftaran::delete/$1');

    // Dokumen Routing
    $routes->get('dokumen', 'dokumen\Dokumen::index');
    $routes->get('dokumen/(:num)', 'dokumen\Dokumen::show/$1');
    $routes->post('dokumen', 'dokumen\Dokumen::store');
    $routes->put('dokumen/(:num)', 'dokumen\Dokumen::update/$1');
    $routes->delete('dokumen/(:num)', 'dokumen\Dokumen::delete/$1');

    // Data Orang Tua Routing
    $routes->get('data-orang-tua', 'data_orang_tua\DataOrangTua::index');
    $routes->get('data-orang-tua/(:num)', 'data_orang_tua\DataOrangTua::show/$1');
    $routes->post('data-orang-tua', 'data_orang_tua\DataOrangTua::store');
    $routes->put('data-orang-tua/(:num)', 'data_orang_tua\DataOrangTua::update/$1');
    $routes->delete('data-orang-tua/(:num)', 'data_orang_tua\DataOrangTua::delete/$1');

    // Akademik Routing
    $routes->get('akademik', 'akademik\Akademik::index');
    $routes->get('akademik/(:num)', 'akademik\Akademik::show/$1');
    $routes->post('akademik', 'akademik\Akademik::store');
    $routes->put('akademik/(:num)', 'akademik\Akademik::update/$1');
    $routes->delete('akademik/(:num)', 'akademik\Akademik::delete/$1');
  });
});
?>