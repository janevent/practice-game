require './lib/auth.rb'

class UsersController < ApplicationController
    def signup 
        #params.inspect
        #binding.pry
        user = User.new(username: params[:username], password: params[:password])
        if user.save
            game = user.games.build(points: 0, stars: 0, complete: false)
            #binding.pry
            game.save
            #binding.pry
            #render json: user
            render json: { user: {id: user.id, username: user.username }, incomplete_game: game, token: Auth.create_token(user)} 
        else 
            render json: {errors: user.errors.full_messages}, status: 500
        end
    end

    def index
        users = User.all 
        render json: users
    end

    private 
   # def user_params    
    #    params.require(:user).permit(:username, :password)
    #end
end