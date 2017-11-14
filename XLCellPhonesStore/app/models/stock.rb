# == Schema Information
#
# Table name: stocks
#
#  id          :integer          not null, primary key
#  vendor      :string
#  model       :string
#  color       :string
#  is_pre_paid :boolean          default(TRUE)
#  quantity    :integer
#  amount      :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'csv'

class Stock < ApplicationRecord
  BRANDS = [
    APPLE     = 'apple',
    MOTOROLA  = 'motorola',
    SAMSUNG   = 'samsung'
  ].freeze

  validates :vendor,      inclusion: { in: BRANDS }
  validates :quantity,    numericality: { greater_than_or_equal_to: 0 }
  validates :amount,      numericality: { greater_than: 0.0 }

  def pre_or_post_paid_pt_br
    is_pre_paid? ? 'Pré-Pago' : 'Pós-Pago'
  end

  def self.import_from_file(file)
    self.transaction do
      begin
        CSV.foreach(file.path, headers: true) do |row|
          entry = self.new  vendor:               row['fabricante'].downcase,
                            model:                row['modelo'],
                            color:                row['cor'],
                            is_pre_paid:          row['modalidade'] == 'pre' ? true : false,
                            quantity:             row['quantidade'].to_i,
                            amount:               row['valor'].to_f
          entry.save!
        end
      rescue Exception => e
        Rails.logger.info(e.inspect)
        return false
      end
    end
  end
end
