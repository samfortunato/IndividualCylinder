require "test_helper"

class VideoTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess::FixtureFile

  test "validates title exists" do
    user = users(:one)

    video = user.videos.new(
      title: nil,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("videos/video-file.mp4", "video/mp4")
    )

    assert_not video.valid?
    assert_includes video.errors[:title], "can't be blank"
  end

  test "validates description exists" do
    user = users(:one)

    video = user.videos.new(
      title: SecureRandom.alphanumeric,
      description: nil,
      video_file: file_fixture_upload("videos/video-file.mp4", "video/mp4")
    )

    assert_not video.valid?
    assert_includes video.errors[:description], "can't be blank"
  end

  test "validates that video has a video file" do
    user = users(:one)

    video = user.videos.new(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
    )

    assert_not video.valid?
    assert_includes video.errors[:video_file], "must be attached"
  end

  test "belongs to an uploader" do
    user = users(:one)

    video = user.videos.create!(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("videos/video-file.mp4", "video/mp4")
    )

    assert_equal user.id, video.uploader_id
  end

  test "has many comments" do
    user = users(:one)
    video = videos(:one)

    comment_one = video.comments.create!(
      user_id: user.id,
      body: SecureRandom.alphanumeric,
    )
    comment_two = video.comments.create!(
      user_id: user.id,
      body: SecureRandom.alphanumeric,
    )

    assert_includes video.comments, comment_one
    assert_includes video.comments, comment_two
  end

  test "destroys comments upon destruction" do
    user = users(:one)
    video = videos(:one)
    comment = video.comments.create!(
      user_id: user.id,
      body: SecureRandom.alphanumeric,
    )

    video.destroy!

    assert_nil Comment.find_by(id: comment.id)
  end

  test "has many likes" do
    user = users(:one)
    video = videos(:one)

    like_one = video.likes.create!(
      user_id: user.id,
      was_liked: rand < 0.5,
    )

    like_two = video.likes.create!(
      user_id: user.id,
      was_liked: rand < 0.5,
    )

    assert_includes video.likes, like_one
    assert_includes video.likes, like_two
  end

  test "is likable" do
    user = users(:one)
    video = videos(:one)
    like = video.likes.create!(
      user_id: user.id,
      was_liked: rand < 0.5,
    )

    assert_equal like.likable, video
  end

  test "destroys likes upon destruction" do
    user = users(:one)
    video = videos(:one)
    like = video.likes.create!(
      user_id: user.id,
      was_liked: rand < 0.5,
    )

    video.destroy!

    assert_nil Like.find_by(id: like.id)
  end

  test "has one video file" do
    video = videos(:one)
    video_file = file_fixture_upload("videos/video-file.mp4", "video/mp4")

    video.video_file.attach(video_file)

    assert video.video_file.attached?
  end

  test "has one video thumbnail" do
    video = videos(:one)
    video_thumbnail = file_fixture_upload("images/default-video-thumbnail.png", "image/png")

    video.video_thumbnail.attach(video_thumbnail)

    assert video.video_thumbnail.attached?
  end
end
