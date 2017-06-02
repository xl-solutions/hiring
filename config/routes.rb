Rails.application.routes.draw do
  resources :modalidades
  resources :modelos
  resources :cors
  resources :fabricantes
  resources :produtos
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
