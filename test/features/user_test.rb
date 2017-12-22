require "test_helper"

class UserTest < Capybara::Rails::TestCase
  # https://github.com/teamcapybara/capybara#the-dsl
  setup do
    @phone_1 = phones(:one)
    @phone_2 = phones(:two)
  end

  feature "user make a search" do
    scenario "user enters a valid input" do
      visit '/phones'

      fill_in 'phones_filter_models', with: @phone_1.model
      first('#phones_filter_colors', visible: false).set( @phone_1.color )
      click_button 'Filtrar'

      page.current_path.must_equal phones_path
      page.must_have_content @phone_1.color
      page.wont_have_content @phone_2.model

    end
  end


  feature "user send a file to import" do
    scenario "user sends a valid file" do
      visit '/phones'

      attach_file('file', 'input_invalido.csv')
      click_button 'importar'

      page.current_path.must_equal phones_path
      page.must_have_content "Produtos não importados: 3"
      page.must_have_content "Produtos importados com sucesso: 9"

    end
  end

end
