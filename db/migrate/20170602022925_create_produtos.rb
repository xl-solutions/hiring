class CreateProdutos < ActiveRecord::Migration[5.1]
  def change
    create_table :produtos do |t|
      t.float :quantidade
      t.float :valor

      t.timestamps
    end
  end
end
