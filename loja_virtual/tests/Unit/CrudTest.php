<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Celular;
use App\Database\Factories\CelularFactory;
use App\Repositories\CelularRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_nao_tem_registro_db()
    {
        $this->assertEquals(0, Celular::get()->count());
    }

    public function test_tem_registro_db()
    {
        $cels = $this->createCelulares();
        $count_registros = Celular::get()->count();

        $this->assertEquals(2, $count_registros);
        $this->assertDatabaseHas('celulares', $cels[0]->toArray());
        $this->assertDatabaseHas('celulares', $cels[1]->toArray());
    }

    public function test_criacao_registro_db()
    {
        $repo = new CelularRepository();
        $celular = [
            'carrier_plan_type' => "pos",
            'color' => "black",
            'quantity' => 5,
            'manufacturer' => "sum",
            'model' => "s5",
            'price' => 55.00,
        ];

        $cel = $repo->create($celular);
        $this->assertEquals(1, Celular::get()->count());

        $repo->create($celular);
        $this->assertEquals(2, Celular::get()->count());
    }

    public function test_retorno_filtro_vazio()
    {
        $this->createCelulares();
        $repo = new CelularRepository();

        $query = $repo->filters("", "", "");
        $this->assertEquals(0, $query->count());

        $query = $repo->filters("test", "test", "test");
        $this->assertEquals(0, $query->count());

        $query = $repo->filters(NULL, "test", "test");
        $this->assertEquals(0, $query->count());

        $query = $repo->filters(NULL, NULL, "tested");
        $this->assertEquals(0, $query->count());
    }

    public function test_retorno_filtro_manufacturer()
    {
        $this->createCelulares();
        $repo = new CelularRepository();

        $query = $repo->filters(NULL, NULL, NULL);
        $this->assertEquals(2, $query->count());

        $query = $repo->filters("", NULL, NULL);
        $this->assertEquals(0, $query->count());

        $query = $repo->filters("moto", NULL, NULL);
        $this->assertEquals(2, $query->count());
    }

    public function test_retorno_filtro_model()
    {
        $this->createCelulares();
        $repo = new CelularRepository();

        $query = $repo->filters(Null, "", NULL);
        $this->assertEquals(0, $query->count());

        $query = $repo->filters(Null, "test", NULL);
        $this->assertEquals(1, $query->count());
    }

    public function test_retorno_filtro_carrier_plan_type()
    {
        $this->createCelulares();
        $repo = new CelularRepository();

        $query = $repo->filters(Null, NULL, "");
        $this->assertEquals(0, $query->count());

        $query = $repo->filters(Null, NULL, "pos");
        $this->assertEquals(1, $query->count());


        $query = $repo->filters(Null, NULL, "pre");
        $this->assertEquals(1, $query->count());
    }


    # Help functions #

    private function createCelulares()
    {
        $cels = [
            Celular::create([
                'id' => 1,
                'carrier_plan_type' => "pos",
                'color' => "lightGray",
                'quantity' => 6,
                'manufacturer' => "moto",
                'model' => "vel",
                'price' => 1387.17
            ]),
            Celular::create([
                'id' => 1,
                'carrier_plan_type' => "pre",
                'color' => "white",
                'quantity' => 5,
                'manufacturer' => "moto",
                'model' => "test",
                'price' => 2.55
            ]),
        ];
        return $cels;
    }
}
