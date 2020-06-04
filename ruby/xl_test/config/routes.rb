Rails.application.routes.draw do
  root to: "phones#index"

  get 'phones/index'
  get 'phones/import' => 'phones#import'

  resources :phones do
    collection {post :import}
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
