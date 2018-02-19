require 'roo'

class CellphoneController < ApplicationController

  def index
  	@cellphones = Cellphone.all
  end

  def search
    @selected = Cellphone.where("(model LIKE :param) OR (manufacturer LIKE :param) OR (color LIKE :param)", 
      param: "%#{params[:query_param]}%")

    respond_to do |format|
        format.js
    end
  end

  def create
  	build_and_save(cellphone_params)

  	redirect_to cellphone_index_url
  end

  def import
  	flash[:errors] = []

  	parsed = Roo::CSV.new(params.require(:file).tempfile).parse(headers: true)

  	parsed.shift #remove header line

  	parsed.each_with_index do |row, index|
  	  build_and_save(row, index)
  	end

    redirect_to cellphone_index_url
  end

  private
    def cellphone_params
	  params.require(:cellphone).permit(:manufacturer, :model, :color, :carrier_plan_type, :quantity, :price)
    end

    def build_and_save params, row_no = 0
      cellphone = Cellphone.new(params)

      unless cellphone.save
      	flash[:errors].push("Invalid row (#{row_no}): #{cellphone.errors.full_messages.join(', ')}") 
      end
    end
end
