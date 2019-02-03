@uploader = User.find_by(id: @video.uploader_id)

json.video do
  json.extract! @video, :id, :title, :description, :views, :uploader_id
  json.comment_ids @video.comment_ids.reverse
  json.video_url url_for(@video.video_file)
  json.video_thumbnail_url (url_for(@video.video_thumbnail) || '')
  json.upload_date @video.created_at.strftime('%B %-d, %Y')
end

json.users do
  unless @video.comments.empty?
    @video.comments.each do |comment|
      json.set! comment.user.id do
        json.extract! comment.user, :id, :first_name, :last_name
        json.avatar_url url_for(comment.user.avatar)
      end
    end
  end

  json.set! @uploader.id do
    json.extract! @uploader, :id, :first_name, :last_name
    json.avatar_url url_for(@uploader.avatar)
  end
end

unless @video.comments.empty?
  json.comments do
    @video.comments.each do |comment|
      json.set! comment.id do
        json.extract! comment, :id, :user_id, :reply_id, :video_id, :body
        json.created_at time_ago_in_words(
          comment.created_at,
          include_seconds: true
        )
      end
    end
  end
end

