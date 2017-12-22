Rails.application.routes.draw do
  root to: 'phones#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :phones do
    collection do # collection does not require the phone_id
      post :importer
    end
  end
end
