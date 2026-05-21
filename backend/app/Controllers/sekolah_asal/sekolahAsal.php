<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\M_sekolah_asal;

class SekolahAsal extends BaseController
{
    use ResponseTrait;
    /**
     * @var M_sekolah_asal
     */

    protected $model;
    protected $format = 'json';

    public function __construct()
    {
        $this->model = new M_sekolah_asal();
    }
    
    public function index()
    {
        //
    }
}