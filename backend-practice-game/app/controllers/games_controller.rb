class GamesController < ApplicationController 
    def index
        token = request.env["HTTP_AUTHORIZATION"]
        if token && Auth.decode_token(token)
            render json: Game.all 
        else
            render json: { errors: { message: "Need a valid token"} }, status: 500
        end
    end
end