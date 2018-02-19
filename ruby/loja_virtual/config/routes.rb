Rails.application.routes.draw do
  get 'cellphone/index'

  resources :cellphone do
  	collection do
  		post :import
  		post :search

  		get :show_list
      get :show_import
  	end
  end

  root 'cellphone#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
