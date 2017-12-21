class CellphoneImporterJob < ApplicationJob
  queue_as :default

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

  def perform(filepath)
    CSV.foreach(filepath, headers: true, col_sep: ',') do |line|
      result = FIELDS_LABELS.keys.reduce({}) do |acc, elem|
        acc[FIELDS_LABELS[elem][:label]] = format_value(line[elem.to_s], FIELDS_LABELS[elem][:type])
        acc
      end

      Cellphone.create(result)
    end
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
