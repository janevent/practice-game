class ApplicationController < ActionController::API

    def current_user
        user = User.find_by(id: sessions[:user_id])
    end

    def logged_in?
        !!current_user
    end
end
