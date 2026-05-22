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
  });
});
?>