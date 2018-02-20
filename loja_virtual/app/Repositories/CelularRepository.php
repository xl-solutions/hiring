<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Celular;

class CelularRepository extends BaseRepository
{
    protected $modelClass = Celular::class;

    /**
     * Crate Celular objects
     * 
     * @param array $data
     */
    public function create($data)
    {
        $this->modelClass::create($data);
    }

    public function filters($manufacturer, $model, $carrier_plan_type)
    {
        $query = $this->newQuery();

        if(!is_null($manufacturer))
        {
            $query->where('manufacturer', $manufacturer);
        }

        if(!is_null($model)) {
            $query->where('model', $model);
        }
        
        if(!is_null($carrier_plan_type)) {
            $query->where('carrier_plan_type', $carrier_plan_type);
        }

        return $this->doQuery($query, $take=false, $paginate=false);
    }
}