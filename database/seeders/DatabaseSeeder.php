<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
        'name' => 'Ahmet',
        'surname'=>'Yıldız',
        'email' => 'demo@demo.net',
        'role' => 'user',
        'password' => bcrypt('1234567'),
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Ayşe',
            'surname'=>'Yıldız',
            'email' => 'admin@demo.net',
            'role' => 'admin',
            'password' => bcrypt('1234567'),
            ]);
    }
}
