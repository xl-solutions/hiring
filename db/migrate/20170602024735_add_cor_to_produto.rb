class AddCorToProduto < ActiveRecord::Migration[5.1]
  def change
    add_reference :produtos, :cor, foreign_key: true
  end
end
