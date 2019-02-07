json.set! @channel.id do
  json.extract! @channel, :id, :owner_id, :description
  json.banner_image ''
end
