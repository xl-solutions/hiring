class Phone < ApplicationRecord

  validates_presence_of :manufacturer, :model, :color, :plan, :quantity, :price

  scope :colors, -> (colors) { where color: colors }
  scope :plans, -> (plans) { where plan: plans }
  scope :manufacturers, -> (manufacturers) { where manufacturer: manufacturers }
  scope :models, -> (models) { where("model LIKE ?", "%#{models}%" )}

  def self.importer csv

    notices_array = []
    imported_success = 0
    not_imported = 0

    # headers avisa que o arquivo tem cabeçalho
    # header_converters: converte os cabeçalhos para downcase
    CSV.foreach(csv.path, headers: true, header_converters: :downcase) do |row|
      # puts $. # get the line of the reading file by ruby
      phone_param = row.to_h
      phone = Phone.create manufacturer: phone_param['fabricante'], model: phone_param['modelo'], color: phone_param['cor'], plan: phone_param['modalidade'], quantity: phone_param['quantidade'], price: phone_param['valor']
      if phone.save
        imported_success +=1
      else
        not_imported +=1
        notices_array << { message:"Falha ao importar o produto na linha numero #{$.}", errors: phone.errors.full_messages, type: 'alert' }
      end

    end# CSV do
    notices_array << { message: "Produtos não importados: #{not_imported}", type: 'notice'}
    notices_array << { message: "Produtos importados com sucesso: #{imported_success}", type: 'notice'}

    notices_array
  end # importer

end
