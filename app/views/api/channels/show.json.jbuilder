json.channel do
  json.set! @channel.id do
    json.extract! @channel, :id, :owner_id, :description
    json.banner_image_url url_for(@channel.banner_image)

    json.subscriber_amount @channel.subscribers.count
    
    if @channel.videos
      video_view_count = 0

      @channel.videos.each do |video|
        video_view_count += video.views
      end

      json.total_views video_view_count

      json.video_ids @channel.video_ids
    else
      json.total_views 0
      json.video_ids []
    end

    json.join_date @channel.created_at.strftime('%B %-d, %Y')

    if current_user
      json.current_user_is_subscribed current_user.subscribed_channel_ids.include?(@channel.id)
    else
      json.current_user_is_subscribed false
    end
  end
end

json.user do
  json.set! @channel.owner.id do
    json.partial! 'api/users/user', user: @channel.owner
  end
end

json.videos do
  @channel.videos.each do |video|
    json.set! video.id do
      json.extract! video, :id, :title, :uploader_id, :views
      json.video_thumbnail_url url_for(video.video_thumbnail)
      json.upload_date "#{time_ago_in_words(
        video.created_at,
        include_seconds: true
      )} ago"
    end
  end
end
