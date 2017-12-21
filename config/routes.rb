Rails.application.routes.draw do
  resources :cellphones, only: [:index]

  get 'import', to: 'importer#import'
  post 'upload_file', to: 'importer#upload_file'
end
