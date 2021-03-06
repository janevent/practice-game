require './lib/auth.rb'

class SessionsController < ApplicationController 
    def login 
        
        user = User.find_by(username: params[:username])
        #token = headers["Authorization"]
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            #token = Auth.create_token({username: user.username, id: user.id})
            #SAME_SITE=none SECURE
            #binding.pry
            #Game.where(complete: false)
            #binding.pry
            incomplete_game = user.games.incomplete_game[0]
            if incomplete_game == nil
                incomplete_game = user.games.create(points:0, stars:0, complete: false)
            end

            #binding.pry
            #render json: { user: {id: user.id, username: user.username}, incomplete_game: incomplete_game, token: Auth.create_token({ username: user.username, id: user.id}) }
            #binding.pry
           # render json: {message: "json response"}
            #render "user"
            #binding.pry
           #render json: { user: UserSerializer.new(user), game: GameSerializer.new(incomplete_game), token: token }
           render json: { user: UserSerializer.new(user), game: GameSerializer.new(incomplete_game) };
        else
            render json: { errors: { message: "Unable to find a user with that name or password"} }, status: 500
        end
    end

    def logout 
        session[:user_id].clear
        user = User.find_by(username: params[:username])
        if user 
            render json: user 
        end
    end
end