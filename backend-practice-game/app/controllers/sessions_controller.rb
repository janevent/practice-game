require 'Auth'

class SessionsController < ApplicationController 
    def login 
        user = User.find_by(username: params[:username])
        if user & user.authenticate(params[:password])
            #render json: user 
            render json: { token: Auth.create_token({ username: user.username, id: user.id}) }
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