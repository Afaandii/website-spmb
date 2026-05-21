<?php

use CodeIgniter\Router\RouteCollection;
use App\Controllers\Role;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes){
  $routes->group('v1', function($routes){
    $routes->get('role', function(){
      return "tetstt!";
    });
    $routes->get('role', 'Role::index');
    $routes->post('role', [Role::class, 'store']);
  });
});