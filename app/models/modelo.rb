class Modelo < ApplicationRecord
	has_many :produtos

	validates :nome, presence: {
			  message: 'Nome do Modelo não pode ser vazio!'}
end
