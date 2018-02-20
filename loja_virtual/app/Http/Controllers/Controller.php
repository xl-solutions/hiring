<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use League\Csv\Reader;
use League\Csv\Statement;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $pathname = NULL;
    protected $csvRecords = NULL;

    /**
     * Get data from the csv
     */
    public function getRecodsCsv()
    {
        return $this->csvRecords;
    }
    
    /**
     * Upload file to storge/csvs
     * 
     * @param $file 
     */
    protected function uploadCSV($file)
    {
        $name = time() . '-' . $file->getClientOriginalName();
        $path = storage_path('csvs');
        $file->move($path, $name);
        $this->pathname = $path . '/' . $name;

        return $this;
    }

    /**
     * Read csv file with delimiter ','
     * 
     * @return ResultSet
     */
    protected function readFileCSV()
    {
        $stream = fopen($this->pathname, 'r');
        $csv = Reader::createFromStream($stream);
        $csv->setDelimiter(',')
            ->setHeaderOffset(0);
        $stmt = (new Statement())
            ->offset(1);
        $this->csvRecords = $stmt->process($csv);

        return $this;
    }
}
