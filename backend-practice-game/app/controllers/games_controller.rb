class GamesController < ApplicationController 
    def index
        token = request.env["HTTP_AUTHORIZATION"]
        if token && Auth.decode_token(token)
            render json: Game.all 
        else
            render json: { errors: { message: "Need a valid token"} }, status: 500
        end
    end

    def update 
        #token  = headers userToken 
        if token && Auth.decode_token(token)
            game = Game.find_by(id: params[:id]);
            game.update(points: params[:points], stars: params[:stars], complete: params[:complete])
            render json: Game.serializer(game)
        else
            render json: {errors: {message: "Need a valid token"}},
            status: 500
        end
    end
end