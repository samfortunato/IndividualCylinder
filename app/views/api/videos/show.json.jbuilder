json.set! @video.id do
  json.extract! @video, :id, :title, :description
  json.videoUrl url_for(@video.video_file)
end
