require "test_helper"

class CommentTest < ActiveSupport::TestCase
  test "validates body exists" do
    user = users(:one)
    video = videos(:one)

    comment = user.comments.new(
      video:,
      body: nil,
    )

    assert_not comment.valid?
  end

  test "belongs to a user" do
    user = users(:one)
    video = videos(:one)

    comment = user.comments.new(
      video:,
      body: SecureRandom.alphanumeric,
    )

    assert_equal comment.user, user
  end

  test "belongs to a video" do
    user = users(:one)
    video = videos(:one)

    comment = user.comments.new(
      video:,
      body: SecureRandom.alphanumeric,
    )

    assert_equal comment.video, video
  end

  test "can have many replies" do
    # user = users(:one)
    # video = videos(:one)
    # comment = comments(:one)

    # reply_one = comment.comments.new(
    #   reply: comment,
    #   video: video,
    #   user: user,
    #   body: SecureRandom.alphanumeric,
    # )

    # assert_includes comment.comments, reply_one

    skip <<~REASON
      TODO: "reply" association is currently not working. add correct associations, and then test.
      app is not even using replies currently, anyway
    REASON
  end

  test "has many likes" do
    user = users(:one)
    comment = comments(:one)

    like_one = comment.likes.create!(
      user_id: user.id,
      was_liked: rand < 0.5
    )

    like_two = comment.likes.create!(
      user_id: user.id,
      was_liked: rand < 0.5
    )

    assert_includes comment.likes, like_one
    assert_includes comment.likes, like_two
  end

  test "destroys likes upon destruction" do
    skip "TODO: add association option for destroying?"
  end
end
