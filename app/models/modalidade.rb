class Modalidade < ApplicationRecord
	has_many :produtos

	validates :nome, presence: true, inclusion: { in: %w(pre pos),
			  message: '%{value} Não é uma modalidade válida!'}

end