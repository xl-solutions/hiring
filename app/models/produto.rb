class Produto < ApplicationRecord
	belongs_to :fabricante
	belongs_to :modelo
	belongs_to :modalidade
	belongs_to :cor
end
