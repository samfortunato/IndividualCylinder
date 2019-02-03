json.extract! comment, :id, :user_id, :reply_id, :video_id, :body
json.likes comment.likes.count { |like| like.was_liked == true }
json.dislikes comment.likes.count { |like| like.was_liked == false }
json.created_at time_ago_in_words(
  comment.created_at,
  include_seconds: true
)
