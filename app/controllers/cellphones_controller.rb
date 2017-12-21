class CellphonesController < ApplicationController
  def index
    @cellphones = Cellphone.all
  end
end
