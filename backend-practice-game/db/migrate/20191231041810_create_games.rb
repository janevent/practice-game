class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :points
      t.integer :stars
      t.boolean :complete

      t.timestamps
    end
  end
end
