Rails.application.routes.draw do
    resources :users do
    collection { post :import }
  end
  
  root to: "users#index"
  #get 'users/index'
  #get 'users/import'
  get 'users/buscar', 'users#buscar'
  get 'users/inventario'
end
