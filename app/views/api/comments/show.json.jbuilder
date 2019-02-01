json.extract! @comment, :id, :reply_id, :video_id, :body
json.createdAt time_ago_in_words(
  @comment.created_at,
  include_seconds: true
)
