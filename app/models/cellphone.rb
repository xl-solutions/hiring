class Cellphone < ApplicationRecord

  FIELDS_LABELS = {
    "fabricante": {
      "label": "maker",
      "type": "string"
    },
    "modelo": {
      "label": "model",
      "type": "string"
    },
    "cor": {
      "label": "color",
      "type": "string"
    },
    "modalidade": {
      "label": "modality",
      "type": "string"
    },
    "quantidade": {
      "label": "quantity",
      "type": "integer"
    },
    "valor": {
      "label": "value",
      "type": "float"
    }
  }

  class << self
    def import_csv(file)
      if valid_csv?(file)
        CellphoneImporterJob.perform_now(file.path)
      end
    end

    def save_from_csv(filepath)
      CSV.foreach(filepath, headers: true, col_sep: ',') do |line|
        result = FIELDS_LABELS.keys.reduce({}) do |acc, elem|
          acc[FIELDS_LABELS[elem][:label]] = format_value(line[elem.to_s], FIELDS_LABELS[elem][:type])
          acc
        end

        Cellphone.create(result)
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

    private

    def format_value(value, type)
      if type == 'integer'
        value.to_i
      elsif type == 'float'
        value.to_f
      else
        value
      end
    end
  end
end
