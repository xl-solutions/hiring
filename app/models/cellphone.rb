class Cellphone < ApplicationRecord

  class << self
    def import_csv(file)
      if valid_csv?(file)
        CellphoneImporterJob.perform_now(file.path)
      end
    end

    def valid_csv?(file)
      CSV.foreach(file.path, headers: true, col_sep: ',') do |line|
        if line.fields.any? { |elem| elem.nil? }
          return false
        end
      end
      true
    end
  end
end
