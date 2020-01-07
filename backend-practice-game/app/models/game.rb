class Game < ApplicationRecord
    belongs_to :user
    #scope method to find games in progress
    scope :incomplete_game, -> { where('complete = ?', false)}
end
