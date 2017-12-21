class CreateCellphones < ActiveRecord::Migration[5.1]
  def change
    create_table :cellphones do |t|
      t.string :maker
      t.string :model
      t.string :color
      t.string :modality
      t.integer :quantity
      t.float :value

      t.timestamps
    end
  end
end
