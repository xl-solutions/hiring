class CreateCellphones < ActiveRecord::Migration[5.1]
  def change
    create_table :cellphones do |t|
      t.string :manufacturer
      t.string :model
      t.string :color
      t.string :carrier_plan_type
      t.integer :quantity
      t.decimal :price

      t.timestamps
    end
  end
end
