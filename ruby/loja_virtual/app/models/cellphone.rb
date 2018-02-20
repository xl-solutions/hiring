class Cellphone < ApplicationRecord
	validates :manufacturer, presence: true
	validates :model, presence: true
	validates :color, presence: true
	validates :carrier_plan_type, inclusion: { in: %w(pre pos), message: "%{value} is not a valid value"}
	validates :quantity, numericality: { only_integer: true }
	validates :price, numericality: true
end
