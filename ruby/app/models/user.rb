class User < ApplicationRecord
  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      #User.create!(fabricante: row[0], modelo: row[1], cor: row[2], plano: row[3], quantidade: row[4], preco: row[5])
      user = User.new(fabricante: row[0], modelo: row[1], cor: row[2], plano: row[3], quantidade: row[4], preco: row[5])

      return false unless user.valid?
 
      user.save
    end
  end

  def self.search(search)
    if search
      User.where('fabricante LIKE :search OR modelo LIKE :search OR cor LIKE :search OR plano LIKE :search', 
      search: "%#{search}%")
    else
      User.all
    end
  end
end
