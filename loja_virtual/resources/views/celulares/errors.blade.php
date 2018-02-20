@extends('layouts.app')

@section('title', 'Celulares')

@section('content')
    @if(!empty($errors_norm))
        <div class="alert alert-danger" role="alert">
            <strong>Errors!</strong>
            <ul>
                @foreach($errors_norm as $err)
                    <li>{{$err}}</li>
                @endforeach
            </ul>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif
@endsection