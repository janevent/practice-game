require 'Auth'

class UsersController < ApplicationController
    def signup 
        #params.inspect
        user = User.new(user_params)
        if user.save
            #render json: user
            render json: { token: Auth.create_token(user)} 
        else 
            render json: {errors: user.errors.full_messages}, status: 500
        end
    end

    def index
        users = User.all 
        render json: users
    end

    private 
    def user_params    
        params.require(:user).permit(:username, :password)
    end
end