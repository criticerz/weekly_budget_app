Rails.application.routes.draw do

  root 'users#connect_bank'

  post 'get_access_token', to: 'users#get_access_token'
  get 'transactions', to: 'users#transactions'
  get 'create_public_token', to: 'users#create_public_token'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
