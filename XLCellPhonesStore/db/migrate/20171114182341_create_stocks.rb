class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :stocks do |t|
      t.string  :vendor
      t.string  :model
      t.string  :color
      t.boolean :is_pre_paid,    default: :true
      t.integer :quantity
      t.float   :amount

      t.timestamps
    end
  end
end
