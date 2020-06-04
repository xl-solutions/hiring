require 'rails_helper'

RSpec.describe Phone do

  describe 'upload csv file' do
    scenario 'success' do
      visit root_url
      click_link 'Import Data'
      page.attach_file("file", Rails.root.join('spec', 'fixtures', 'files', 'input_valid.csv'))
      click_button 'Import Data'
      expect(page).to have_content('Data was succesfully imported.')           
    end

    scenario 'fail' do
      visit root_url
      click_link 'Import Data'
      page.attach_file("file", Rails.root.join('spec', 'fixtures', 'files', 'input_invalid.csv'))
      click_button 'Import Data'
      expect(page).to have_content('Could not import data.')
    end
  end

end