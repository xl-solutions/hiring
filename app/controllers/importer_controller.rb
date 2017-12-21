class ImporterController < ApplicationController
  def import

  end

  def upload_file
    Cellphone.import_csv(params[:file])

    redirect_to cellphones_path
  end
end
