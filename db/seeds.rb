# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo_user = User.create!(
  first_name: 'Demo',
  last_name: 'User',
  email: 'demo-user@mail.com',
  password: '12345678'
)

# comment1 = Comment.create!(
#   user_id: 42,
#   video_id: 50,
#   body: 'sup dog yo bro mang dude'
# )
