<?php

use Faker\Generator as Faker;
use App\Models\Celular;

$factory->define(Celular::class, function (Faker $faker) {
    return [
        'carrier_plan_type' => $faker->word,
        'color' => $faker->colorName,
        'quantity' => $faker->randomDigit,
        'manufacturer' => $faker->word,
        'model' => $faker->word,
        'price' => $faker->randomFloat(4, 0, 6000),
    ];
});
