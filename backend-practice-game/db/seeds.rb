# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(username: "Jay", password: "password")
game = user.games.build(points: 97, stars: 9, complete: false)
game.save
user.save
user2 = User.create(username: "Moe", password: "password")
user2.save
game2 = user.games.build(points: 95, stars: 9, complete: false)
user3 = User.create(username: "Sal", password: "password")
game3 = user3.games.build(points: 97, stars: 9, complete: false)
user4 = User.create(username: "Jack", password: "password")
user5 = User.create(username: "Camille", password: "password")
user6 = User.create(username: "Vas", password: "password")


