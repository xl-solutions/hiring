class ImporterController < ApplicationController
  def import

  end

  def upload_file
    if Cellphone.import_csv(params[:file])
      redirect_to cellphones_path, notice: "Aparelhos importados com sucesso."
    else
      redirect_to cellphones_path, alert: "CSV invalido."
    end
  end
end
