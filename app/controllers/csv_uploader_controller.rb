class CsvUploaderController < ApplicationController
  def index
  	unless params[:file].nil?

      _errors = []
  		require 'csv'

  		CSV.foreach(params[:file], headers: true).with_index(1) do |row, index|
  			_l = row.to_hash

  			_p = Produto.new

        _fabricante = Fabricante.find_by_nome(_l['fabricante'])  
  			if _fabricante.nil?
          _p.fabricante = Fabricante.create(nome: _l['fabricante']) 
        else
          _p.fabricante = _fabricante
        end

        _modalidade = Modalidade.find_by_nome(_l['modalidade'])  
        if _modalidade.nil?
          _p.modalidade = Modalidade.create(nome: _l['modalidade']) 
        else
          _p.modalidade = _modalidade
        end

        _modelo = Modelo.find_by_nome(_l['modelo'])  
        if _modelo.nil?
          _p.modelo = Modelo.create(nome: _l['modelo']) 
        else
          _p.modelo = _modelo
        end

        _cor = Cor.find_by_nome(_l['cor'])  
        if _cor.nil?
          _p.cor = Cor.create(nome: _l['cor']) 
        else
          _p.cor = _cor
        end

  			_p.quantidade = _l['quantidade']
  		
      	_except = ["id", "updated_at", "created_at", "quantidade"]
        _found = Produto.find_by(_p.attributes.except!(_except))
        _p =  _found if _found

        puts _p.attributes.to_json

        _p.valor = _l['valor']
  			_p.save


        _p.errors.messages.each do |erro|
            _errors << "Linha #{index}: #{erro[1][0]}"
        end    

        puts _errors

		end
  		redirect_to produtos_path, :flash => { :error => _errors }
  	end	
  end
end