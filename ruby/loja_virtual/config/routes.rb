Rails.application.routes.draw do
  get 'cellphone/index'

  resources :cellphone do
  	collection do
  		post :import
  		post :search
  	end
  end

  root 'cellphone#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
