class StocksController < ApplicationController

  def index
    @q      = Stock.ransack params[:q]
    @stocks = @q.result
  end

  def update_all
    if Stock.import_from_file params[:csv_file]
      flash[:success] = "Inventário atualizado com sucesso."
    else
      flash[:error] = "falha na importação do CSV. Verifique o formato do arquivo e tente novamente."
    end
    redirect_to stocks_path
  end
end
