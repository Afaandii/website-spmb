<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
  $routes->group('v1', function($routes){

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

    
  });
});
?>