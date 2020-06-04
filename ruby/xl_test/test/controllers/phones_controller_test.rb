require 'test_helper'

class PhonesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get phones_index_url
    assert_response :success
  end

  test "should get import" do
    get phones_import_url
    assert_response :success
  end

end
