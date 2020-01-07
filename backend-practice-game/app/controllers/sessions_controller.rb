require 'Auth'

class SessionsController < ApplicationController 
    def login 
        user = User.find_by(username: params[:username])
        if user & user.authenticate(params[:password])
            #render json: user 
            #Game.where(complete: false)
            incomplete_game = user.games.incomplete_game
            render json: { user: {id: user.id, username: user.username}, incomplete_game: incomplete_game, token: Auth.create_token({ username: user.username, id: user.id}) }
        else
            render json: { errors: { message: "Unable to find a user with that name or password"} }, status: 500
        end
    end

    def logout 
        user = User.find_by(username: params[:username])
        if user 
            render json: user 
        end
    end
end