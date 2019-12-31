class SessionsController < ApplicationController 
    def login 
        user = User.find_by(username: params[:username])
        if user & user.authenticate(params[:password])
            render json: user 
        else
            render json: { errors: { message: "Unable to find a user with that name or password"} }, status: 500
        end
    end
end