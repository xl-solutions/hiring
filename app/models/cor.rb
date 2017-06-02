class Cor < ApplicationRecord
	has_many :produtos

	validates :nome, presence:{
			  message: 'Nome da Cor não pode ser vazio!'}
end
