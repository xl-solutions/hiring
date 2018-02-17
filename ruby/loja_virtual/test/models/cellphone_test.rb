require 'test_helper'

class CellphoneTest < ActiveSupport::TestCase
  def setup
  	@cellphone = Cellphone.new(:manufacturer => 'manuf1', :model => 'model1', :color => 'color1', :carrier_plan_type => 'pre', :quantity => 0, :price => 0)
  end

  test "manufacturer should not be blank" do
  	@cellphone.manufacturer = ''
  	refute @cellphone.valid?
  end

  test "model should not be blank" do
  	@cellphone.model = ''
  	refute @cellphone.valid?
  end

  test "color should not be blank" do
  	@cellphone.color = ''
  	refute @cellphone.valid?
  end

  test "carrier plan type value should be 'pre' or 'pos'" do
  	@cellphone.carrier_plan_type = ''
  	refute @cellphone.valid?

	@cellphone.carrier_plan_type = 'other'
  	refute @cellphone.valid?

  	@cellphone.carrier_plan_type = 'pre'
  	assert @cellphone.valid?

  	@cellphone.carrier_plan_type = 'pos'
  	assert @cellphone.valid?
  end

  test "quantity should be an integer" do
  	@cellphone.quantity = ''
  	refute @cellphone.valid?

  	@cellphone.quantity = 0.75
  	refute @cellphone.valid?

  	@cellphone.quantity = 10
  	assert @cellphone.valid?
  end

  test "price should be numerical" do
  	@cellphone.price = ''
  	refute @cellphone.valid?

  	@cellphone.price = 0.75
  	assert @cellphone.valid?

  	@cellphone.price = 10
  	assert @cellphone.valid?
  end

end
