class GamesController < ApplicationController 
    def index
        token = request.env["HTTP_AUTHORIZATION"]
        if token && Auth.decode_token(token)
            render json: Game.all 
        else
            render json: { errors: { message: "Need a valid token"} }, status: 500
        end
    end

    def show 
        #game = Game.find_by(id: params[:id])
        token = request.env["HTTP_AUTHORIZATION"].split(" ").last
        if token && Auth.decode_token(token)
            game = Game.find_by(id: params[:id])
            if game 
                render json: GameSerializer.new(game)
            else 
                render json: { errors: {message: "Can not find game"}}
            end
        else
            render json: { errors: {message: "Need a valid token"}}
        end
            
    end

    def update 
        #binding.pry
        #token  = headers userToken 
        token = request.env["HTTP_AUTHORIZATION"].split(" ").last
        #binding.pry
        if token && Auth.decode_token(token)
            game = Game.find_by(id: params[:id]);
            game.update(points: params[:points], stars: params[:stars], complete: params[:complete])
            render json: GameSerializer.new(game)
        else
            render json: {errors: {message: "Need a valid token"}},
            status: 500
        end
    end
end