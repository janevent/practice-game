Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/signup', to: "users#signup"
  post '/login', to: "sessions#login"
  delete '/logout', to: "sessions#logout"
  get '/games', to: "games#index"
  patch '/game', to: "games#update"
  get '/users', to: "users#index"
  get '/games/new', to: "games#new"
  get '/users/:id', to: "users#show"
end
