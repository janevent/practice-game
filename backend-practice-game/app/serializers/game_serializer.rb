class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :points, :stars, :complete, :user_id
  belongs_to :user
end
