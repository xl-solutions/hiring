# == Schema Information
#
# Table name: stocks
#
#  id          :integer          not null, primary key
#  vendor      :string
#  model       :string
#  color       :string
#  is_pre_paid :boolean          default(TRUE)
#  quantity    :integer
#  amount      :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Stock, type: :model do

  context "validating" do
    it { should validate_inclusion_of(:vendor).in_array(Stock::BRANDS) }
    it { should validate_numericality_of(:quantity) }
    it { should validate_numericality_of(:amount) }
  end
end
