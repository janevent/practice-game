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
            options = {
                include: [:games]
            }

            render json: UserSerializer.new(user, options)
            #render json: { user: {id: user.id, username: user.username }, #incomplete_game: game, token: Auth.create_token({username: #user.username, id: user.id})} 
        else 
            render json: {errors: user.errors.full_messages}, status: 500
        end
    end

    def index
        users = User.all 
        #does games need to be in an array?
        options = {
            include: [:games]
        }
        render json: User.serializer(users, options)
    end

    private 
   # def user_params    
    #    params.require(:user).permit(:username, :password)
    #end
end