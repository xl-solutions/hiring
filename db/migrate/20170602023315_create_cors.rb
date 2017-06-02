class CreateCors < ActiveRecord::Migration[5.1]
  def change
    create_table :cors do |t|
      t.string :nome

      t.timestamps
    end
  end
end
