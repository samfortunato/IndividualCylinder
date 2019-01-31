@uploader = User.find_by(id: @video.uploader_id)

json.set! @video.id do
  json.extract! @video, :id, :title, :description, :views
  json.videoURL url_for(@video.video_file)
  json.videoThumbnailURL (url_for(@video.video_thumbnail) || '')
  json.uploadDate @video.created_at.strftime('%B %d, %Y')

  json.uploader do
    json.id @uploader.id
    json.firstName @uploader.first_name
    json.lastName @uploader.last_name
    json.avatarURL url_for(@uploader.avatar)
  end
  
  json.comments do
    @video.comments.each do |comment|
      json.set! comment.id do
        json.extract! comment, :id, :reply_id, :video_id, :body
        json.createdAt time_ago_in_words(
          comment.created_at,
          include_seconds: true
        )
        json.user do
          json.extract! comment.user, :id, :first_name, :last_name
          json.avatarURL url_for(comment.user.avatar)
        end
      end
    end
  end
end

