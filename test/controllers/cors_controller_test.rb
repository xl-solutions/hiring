require 'test_helper'

class CorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cor = cors(:one)
  end

  test "should get index" do
    get cors_url
    assert_response :success
  end

  test "should get new" do
    get new_cor_url
    assert_response :success
  end

  test "should create cor" do
    assert_difference('Cor.count') do
      post cors_url, params: { cor: { nome: @cor.nome } }
    end

    assert_redirected_to cor_url(Cor.last)
  end

  test "should show cor" do
    get cor_url(@cor)
    assert_response :success
  end

  test "should get edit" do
    get edit_cor_url(@cor)
    assert_response :success
  end

  test "should update cor" do
    patch cor_url(@cor), params: { cor: { nome: @cor.nome } }
    assert_redirected_to cor_url(@cor)
  end

  test "should destroy cor" do
    assert_difference('Cor.count', -1) do
      delete cor_url(@cor)
    end

    assert_redirected_to cors_url
  end
end
