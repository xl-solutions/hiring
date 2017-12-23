Rails.application.routes.draw do
  root to: 'cellphones#index'

  resources :cellphones, only: [:index]

  get 'import', to: 'importer#import'
  post 'upload_file', to: 'importer#upload_file'
end
