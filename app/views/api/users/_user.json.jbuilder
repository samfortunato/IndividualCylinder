json.extract! user, :id, :first_name, :last_name, :email
json.avatar_url url_for(user.avatar)
