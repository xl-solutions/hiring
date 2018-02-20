require 'test_helper'
require 'database_cleaner'

DatabaseCleaner.strategy = :truncation

class CellphoneControllerTest < ActionDispatch::IntegrationTest
  def setup
  	DatabaseCleaner.clean
  end

  test "should import cellphone records from a valid csv file" do
  	import_file_and_validate('input_valid_single_row.csv', 1) 
  end

  test "should import multiple cellphone records from a valid csv file" do
  	import_file_and_validate('input_valid.csv', 12)
  end

  test "should not import a file with an invalid record" do
  	import_file_and_validate('input_invalid_single_row.csv', 0)
  end

  test "should import only the valid record from the invalid file" do
  	import_file_and_validate('input_invalid_two_rows_one_valid.csv', 1)
  	assert_match 'Color can\'t be blank', flash[:errors].join(', ')
  end

  private
  	def import_file_and_validate file, row_count
  	  csv_file = Rack::Test::UploadedFile.new("#{TESTDIR}/#{file}", "text")

	    assert_difference('Cellphone.count', row_count) do
  	    post '/cellphone/import', params: { file: csv_file }
  	  end
  	end

end
