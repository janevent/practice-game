require './lib/auth.rb'

class UsersController < ApplicationController
    def signup 
        #params.inspect
        #binding.pry
        user = User.new(username: user_params[:username], password: params[:password])
        if user.save
            session[:user_id] = user.id
            game = user.games.build(points: 0, stars: 0, complete: false)
            #binding.pry
            game.save
            #binding.pry
            #render json: user
            options = {
                include: [:games]
            }
            #token: Auth.create_token({username: user.username, id: user.id}) 
            render json: { user: UserSerializer.new(user, options), incomplete_game: game }
            #render json: { user: {id: user.id, username: user.username }, #incomplete_game: game, token: Auth.create_token({username: #user.username, id: user.id})} 
        else 
            render json: {errors: user.errors.full_messages}, status: 500
        end
    end

    def get_current_user
        #binding.pry
        if logged_in?
            #user = current_user
            render json: {user: current_user} 
        else 
            render json: {message: "no one logged in"}
        end
    end

    def show 
        token = request.env["HTTP_AUTHORIZATION"].split(" ").last
        if token && Auth.decode_token(token)
            user = User.find_by(id: params[:id])
            options = {
                include: [:games]
            }
            if user 
                render json: UserSerializer.new(user, options)
            else
                render json: {errors: "That is not a user"}, status: 500
            end
        end

    end

    def index
        #binding.pry
        #token = request.env["HTTP_AUTHORIZATION"].split(" ").last
        users = User.all 
        complete_users = [];
        users.each do |user|
            complete_users << " #{user.username}:   #{user.games.complete_games.length}" 
        end
        options = {
            include: [:games]
        }
        #render json: UserSerializer.new(users, options)
        render json: complete_users
    end

    private 
    def user_params    
        params.require(:user).permit(:username, :password)
    end
end
