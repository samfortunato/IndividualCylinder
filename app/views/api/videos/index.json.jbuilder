@all_videos.each do |video|
  uploader = User.find_by(id: video.uploader_id)

  json.set! video.id do
    json.extract! video, :id, :title, :views
    json.videoThumbnailURL (url_for(video.video_thumbnail) || '')
    json.uploadDate time_ago_in_words(
      video.created_at,
      include_seconds: true
    )
    json.uploader do
      json.id uploader.id
      json.firstName uploader.first_name
      json.lastName uploader.last_name
    end
  end
end
