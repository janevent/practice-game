Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/signup', to: "users#signup"
  post '/login', to: "sessions#login"
  get '/games', to: "games#index"
  get '/users', to: "users#index"
end
