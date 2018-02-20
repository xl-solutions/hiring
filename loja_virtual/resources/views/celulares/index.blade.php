@extends('layouts.app')

@section('title', 'Celulares')

@section('content')
    <div class="card">
        <h3 class="card-header primary-color white-text">Filters</h3>
        <div class="card-body">
            <form action="/filters" method="post">
                {{ csrf_field() }}
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Manufacturer</label>
                            <input type="text" name="manufacturer" class="form-control" placeholder="Fabricante">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Model</label>
                            <input type="text" name="model" class="form-control" placeholder="Modelo">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Plane</label>
                            <select class="form-control" name="carrier_plan_type">
                                <option value="" selected>Choose...</option>
                                <option value="pre">Pré-pago</option>
                                <option value="pos">Pós-pago</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary pull-right">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <br />
                

    @if(!empty($success))
        <div class="alert alert-success" role="alert">
            <strong>{{$success}}!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif

    <form action="/upload" method="post" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <input type="file" class="form-control" name="file_csv" />
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Upload" />
        </div>
    </form>
    
    
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Manufacturer</th>
                <th scope="col">Model</th>
                <th scope="col">Color</th>
                <th scope="col">Carrier Plan Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
            </tr>
        </thead>
        <tbody>
            @if(!empty($celulares) && count($celulares) > 0)
                @foreach($celulares as $celular)
                    <tr>
                        <th scope="row">{{ $celular->id }}</th>
                        <td>{{ $celular->manufacturer }}</td>
                        <td>{{ $celular->model }}</td>
                        <td>{{ $celular->color }}</td>
                        <td>{{ $celular->carrier_plan_type }}</td>
                        <td>{{ $celular->quantity }}</td>
                        <td>{{ $celular->price }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <th colspan="7">Not records.</th>
                </tr>
            @endif
        </tbody>
    </table>
@endsection