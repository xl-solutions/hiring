Rails.application.routes.draw do
  get 'csv_uploader/index'


  match 'import', to: 'csv_uploader#index', via: [:get, :post]

  resources :modalidades
  resources :modelos
  resources :cors
  resources :fabricantes
  resources :produtos

  root 'csv_uploader#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
