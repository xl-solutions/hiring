class Fabricante < ApplicationRecord
	has_many :produtos

	validates :nome, presence: {
		message: 'Nome do Fabricante não pode ser vazio!'
	}
	
end
