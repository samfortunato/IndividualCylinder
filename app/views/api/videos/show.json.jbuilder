json.set! @video.id do
  json.extract! @video, :id, :title, :description
  json.videoURL url_for(@video.video_file)
  json.videoThumbnailURL (url_for(@video.video_thumbnail) || '')
  json.uploadDate @video.created_at.strftime('%B %d, %Y')
  json.uploader do
    json.id @uploader.id
    json.firstName @uploader.first_name
    json.lastName @uploader.last_name
  end
end
