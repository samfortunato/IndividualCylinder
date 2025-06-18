require "test_helper"

class ChannelTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess::FixtureFile

  test "after creation and commit, should ensure a default channel banner" do
    user = users(:one)
    user.channel.destroy! # we destroy the existing `Channel` to create one for this test

    channel = Channel.create!(owner: user)

    assert channel.banner_image.attached?
  end

  test "belongs to a user" do
    user = users(:one)
    user.channel.destroy!

    channel = Channel.create!(owner: user)

    assert_equal channel.owner, user
  end

  test "has many videos" do
    channel = channels(:one)

    video_1 = channel.owner.videos.create!(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("videos/video-file.mp4", "video/mp4"),
    )

    video_2 = channel.owner.videos.create!(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("videos/video-file.mp4", "video/mp4"),
    )

    assert_includes channel.videos, video_1
    assert_includes channel.videos, video_2
  end

  test "has many subscriptions" do
    channel = channels(:one)
    user_one = users(:two)
    user_two = users(:three)

    subscription_1 = channel.subscriptions.create!(user: user_one)
    subscription_2 = channel.subscriptions.create!(user: user_two)

    assert_includes channel.subscriptions, subscription_1
    assert_includes channel.subscriptions, subscription_2
  end

  test "has many subscribers" do
    channel = channels(:one)
    user_one = users(:two)
    user_two = users(:three)

    channel.subscriptions.create!(user: user_one)
    channel.subscriptions.create!(user: user_two)

    assert_includes channel.subscribers, user_one
    assert_includes channel.subscribers, user_two
  end

  test "has one attached banner image" do
    channel = channels(:one)

    channel.banner_image.attach(file_fixture_upload("images/default-banner-image.jpg", "image/jpeg"))

    assert channel.banner_image.attached?
  end
end
