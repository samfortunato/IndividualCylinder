json.videos do
  @all_videos.each do |video|
    json.set! video.id do
      json.extract! video, :id, :title, :views, :uploader_id
      json.video_thumbnail_url (url_for(video.video_thumbnail) || '')
      json.upload_date time_ago_in_words(
        video.created_at,
        include_seconds: true
      )
    end
  end
end

json.users do
  @all_videos.each do |video|
    json.set! video.user.id do
      json.extract! video.user, :id, :first_name, :last_name
    end
  end
end
