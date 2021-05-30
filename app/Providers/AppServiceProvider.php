<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        App::bind(
            App\Interfaces\AuthRequestInterface::class,
            App\Http\Requests\RegisterRequest::class
        );
        // App::bind(
        //     App\Interfaces\AuthRequestInterface::class,
        //     App\Http\Requests\LoginRequest::class
        // );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
