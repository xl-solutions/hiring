class UsersController < ApplicationController
  def index
  end

  def show
    if params[:search]
      @users = User.search(params[:search].capitalize)
    else
      @users = User.all
    end
  end

  def import
    if User.import(params[:file])
      redirect_to users_inventario_path, notice: "Arquivo importado com sucesso!"
    else
      redirect_to users_inventario_path, notice: "Ocorreu uma falha ao importar o arquivo!"
    end
  end
end