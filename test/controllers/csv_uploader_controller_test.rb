require 'test_helper'

class CsvUploaderControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get csv_uploader_index_url
    assert_response :success
  end

end
