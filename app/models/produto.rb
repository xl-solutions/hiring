class Produto < ApplicationRecord
	belongs_to :fabricante
	belongs_to :modelo
	belongs_to :modalidade
	belongs_to :cor

    #Validação de unicidade
	validates :valor, uniqueness: {
             scope:[:cor, :fabricante, :modalidade, :modelo],
			       message: "Produto duplicado!" }

	validates :fabricante_id,
    presence: {
      message: 'O fabricante dever ser preenchido!'
    }

	validates :modelo_id,
   presence: {
    message: 'O modelo dever ser preenchido!'
   }

  validates :modalidade_id,
    presence: {
      message: 'A modalidade dever ser preenchida!'
    }

	validates :cor_id,
   presence: {
    message: 'A Cor dever ser preenchida!'
   }

	validates :valor,
   numericality: {
     message: 'O valor dever ser numerico!'
   }

	validates :quantidade,
   numericality: {
    message: 'A quantidade dever ser numerica!'
   }

  end
