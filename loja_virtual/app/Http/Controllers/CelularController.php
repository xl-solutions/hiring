<?php

namespace App\Http\Controllers;

use App\Models\Celular;
use Illuminate\Http\Request;
use App\Http\Requests\UploadRequest;
use App\Repositories\CelularRepository;

class CelularController extends Controller
{
    protected $errors = [];
    protected $repo = NULL;

    public function __construct()
    {
        $this->repo = new CelularRepository();
    }

    /**
     * List all Celulares in the view
     */
    public function uploadForm()
    {
        $celulares = $this->repo->getAll();

        return view('celulares.index')->with('celulares', $celulares);
    }
    
    /**
     * Upload csv file
     */
    public function uploadSubmit(Request $request)
    {
        $file = $request->file('file_csv');
        
        if($this->hasFile($request) && $this->isValidExtension($file)) 
        {
            $csvRecords = $this->uploadCSV($file)->readFileCSV()->getRecodsCsv();
            $this->normalizaDatasFromCSV($csvRecords);
        }
        
        if(count($this->errors) > 0)
            return view('celulares.errors', ['errors_norm' => $this->errors]);
        
        foreach($csvRecords as $record)
        {
            $this->repo->create($record);
        }

        $celulares = $this->repo->getAll();

        return back()->with('success', "Upload success")->with('celulares', $celulares);
    }

    public function filters(Request $request)
    {
        $manu = $request->input('manufacturer');
        $model = $request->input('model');
        $plane = $request->input('carrier_plan_type');

        $cels = $this->repo->filters($manu, $model, $plane);
        
        return view('celulares.index')->with('celulares', $cels);
    }

    /**
     * Verify if file exist
     * 
     * @param Request $request
     */
    private function hasFile($request)
    {
        if(!$request->hasFile('file_csv'))
        {
            $this->errors[] = "File not exist";
            return false;
        }

        return true;
    }
    /**
     * Validation extension from file
     * 
     * @param string $extension
     */
    private function isValidExtension($file)
    {
        $extension = $file->getClientOriginalExtension();
        if($extension != "csv")
        {
            $this->errors[] = "File format ." . $extension . " is invalid";
            return false;
        }
        
        return true;
    }

    /**
     * Verify if datas are normalized
     * 
     * @param ResultSet $csv_records
     */
    private function normalizaDatasFromCSV($csv_records)
    {
        foreach ($csv_records as $line => $record) 
        {
            $record_values = array_values($record);
            if(in_array(NULL, $record_values)) 
                $this->errors[] = "It's not normalized record of the line " . ++$line;
        }
    }
}
