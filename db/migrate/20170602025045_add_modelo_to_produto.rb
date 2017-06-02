class AddModeloToProduto < ActiveRecord::Migration[5.1]
  def change
    add_reference :produtos, :modelo, foreign_key: true
  end
end
