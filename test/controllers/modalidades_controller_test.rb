require 'test_helper'

class ModalidadesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @modalidade = modalidades(:one)
  end

  test "should get index" do
    get modalidades_url
    assert_response :success
  end

  test "should get new" do
    get new_modalidade_url
    assert_response :success
  end

  test "should create modalidade" do
    assert_difference('Modalidade.count') do
      post modalidades_url, params: { modalidade: { nome: @modalidade.nome } }
    end

    assert_redirected_to modalidade_url(Modalidade.last)
  end

  test "should show modalidade" do
    get modalidade_url(@modalidade)
    assert_response :success
  end

  test "should get edit" do
    get edit_modalidade_url(@modalidade)
    assert_response :success
  end

  test "should update modalidade" do
    patch modalidade_url(@modalidade), params: { modalidade: { nome: @modalidade.nome } }
    assert_redirected_to modalidade_url(@modalidade)
  end

  test "should destroy modalidade" do
    assert_difference('Modalidade.count', -1) do
      delete modalidade_url(@modalidade)
    end

    assert_redirected_to modalidades_url
  end
end
