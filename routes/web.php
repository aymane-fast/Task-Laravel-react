<?php

use Illuminate\Support\Facades\Route;
use App\http\Controllers\TaskController;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('tasks', TaskController::class);
