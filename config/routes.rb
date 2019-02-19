Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show]
    
    resources :videos, only: [:index, :show, :create, :update, :destroy]
    resources :comments, only: [:create, :show, :update, :destroy]
    resources :likes, only: [:create]
    resources :channels, only: [:show, :update]
    resources :subscriptions, only: [:create, :destroy]
  end
end
