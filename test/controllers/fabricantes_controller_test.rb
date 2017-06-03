require 'test_helper'

class FabricantesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fabricante = fabricantes(:one)
  end

  test "should get index" do
    get fabricantes_url
    assert_response :success
  end

  test "should get new" do
    get new_fabricante_url
    assert_response :success
  end

  test "should create fabricante" do
    assert_difference('Fabricante.count') do
      post fabricantes_url, params: { fabricante: { nome: @fabricante.nome } }
    end

    assert_redirected_to fabricante_url(Fabricante.last)
  end

  test "should show fabricante" do
    get fabricante_url(@fabricante)
    assert_response :success
  end

  test "should get edit" do
    get edit_fabricante_url(@fabricante)
    assert_response :success
  end

  test "should update fabricante" do
    patch fabricante_url(@fabricante), params: { fabricante: { nome: @fabricante.nome } }
    assert_redirected_to fabricante_url(@fabricante)
  end

  test "should destroy fabricante" do
    assert_difference('Fabricante.count', -1) do
      delete fabricante_url(@fabricante)
    end

    assert_redirected_to fabricantes_url
  end
end
