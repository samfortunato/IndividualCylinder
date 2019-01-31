json.extract! user, :id, :first_name, :last_name, :email
json.avatarURL url_for(user.avatar)
