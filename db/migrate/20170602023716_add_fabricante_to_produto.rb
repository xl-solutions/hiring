class AddFabricanteToProduto < ActiveRecord::Migration[5.1]
  def change
    add_reference :produtos, :fabricante, foreign_key: true
  end
end
