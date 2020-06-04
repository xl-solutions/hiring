class Phone < ApplicationRecord
  require 'csv'
  
  validates :manufacturer, :model, :color, :carrier_plan_type, :quantity, :price, presence: true

  def self.import(file)

    transaction do 
      delete_all
  
      CSV.foreach(file.path, headers: true) do |row|
        Phone.create! row.to_hash

      end
    end
  end    
end
