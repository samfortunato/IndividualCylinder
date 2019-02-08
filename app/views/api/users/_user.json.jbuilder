json.extract! user, :id, :first_name, :last_name, :email, :channel_id
json.avatar_url url_for(user.avatar)
