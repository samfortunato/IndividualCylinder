json.set! @video.id do
  json.extract! @video, :id, :title, :description
  json.videoURL url_for(@video.video_file)
  json.videoThumbnailURL (url_for(@video.video_thumbnail) || '')
end
