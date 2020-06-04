class CreatePhones < ActiveRecord::Migration[6.0]
  def change
    create_table :phones do |t|
      t.string :manufacturer
      t.string :model
      t.string :color
      t.string :carrier_plan_type
      t.string :quantity
      t.float :price

      t.timestamps
    end
  end
end
