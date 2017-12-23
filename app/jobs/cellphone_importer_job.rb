class CellphoneImporterJob < ApplicationJob
  queue_as :default

  def perform(filepath)
    Cellphone.save_from_csv(filepath)
  end
end
