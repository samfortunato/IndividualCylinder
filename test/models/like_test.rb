require "test_helper"

class LikeTest < ActiveSupport::TestCase
  test "validates was liked or disliked" do
    user = users(:one)
    likable = videos(:one)

    like = likable.likes.new(
      likable_type: "Video",
      user_id: user.id,
    )

    assert_not like.valid?
  end

  test "belongs to a user" do
    skip "TODO: set so `Like`s belong to a `User`"
  end

  test "belongs to a likable" do
    user = users(:one)
    likable_one = videos(:one)
    likable_two = comments(:one)

    like_one = likable_one.likes.new(
      was_liked: rand < 0.5,
      user_id: user.id,
    )

    like_two = likable_two.likes.new(
      was_liked: rand < 0.5,
      user_id: user.id,
    )

    assert_includes likable_one.likes, like_one
    assert_includes likable_two.likes, like_two
  end
end
