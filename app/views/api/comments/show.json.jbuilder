json.extract! @comment, :id, :user_id, :reply_id, :video_id, :body
json.created_at time_ago_in_words(
  @comment.created_at,
  include_seconds: true
)
