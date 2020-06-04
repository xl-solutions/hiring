class PhonesController < ApplicationController
  def index
    @phones = Phone.all
  end

  def import
    Phone.import(params[:file]) 
      redirect_to root_url, notice: "Data was succesfully imported."
  rescue StandardError => exception
      flash[:error] = exception.to_s
      redirect_to(root_url)
  
  end

  def new
  end

end
