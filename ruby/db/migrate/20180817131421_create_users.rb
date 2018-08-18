class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :fabricante
      t.string :modelo
      t.string :cor
      t.string :plano
      t.integer :quantidade
      t.float :preco

      t.timestamps
    end
  end
end
