class CreatePhones < ActiveRecord::Migration[5.0]
  def change
    create_table :phones do |t|
      t.string :manufacturer,  null: false
      t.string :model,  null: false
      t.string :color,  null: false
      t.string :plan,  null: false
      t.integer :quantity,  null: false
      t.decimal :price, precision: 10, scale: 2,  null: false

      t.timestamps
    end
  end
end
