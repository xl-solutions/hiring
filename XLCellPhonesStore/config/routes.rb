Rails.application.routes.draw do
  resources :stocks, only: :index do
    collection do
      put :update_all
    end
  end

  root to: 'stocks#index'
end
