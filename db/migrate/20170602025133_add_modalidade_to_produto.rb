class AddModalidadeToProduto < ActiveRecord::Migration[5.1]
  def change
    add_reference :produtos, :modalidade, foreign_key: true
  end
end
