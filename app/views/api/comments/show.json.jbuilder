json.extract! @comment, :id, :user_id, :video_id, :body
json.reply_id @comment.reply_id || nil
