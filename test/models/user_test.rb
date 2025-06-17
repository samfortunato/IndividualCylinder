require "test_helper"

class UserTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess::FixtureFile

  test "before validation, ensures a session token" do
    user = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert_nil user.session_token

    user.valid?

    assert_not_nil user.session_token
  end

  test "after creation and committing, ensures it has a profile picture" do
    user = User.create!(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert user.avatar.attached?
  end

  test "after creation, ensures it has a channel" do
    user = User.create!(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com"
    )

    assert_not_nil user.channel
  end

  test "validates first name exists" do
    user = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: nil,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert_not user.valid?
    assert_includes user.errors[:first_name], "can't be blank"
  end

  test "validates last name exists" do
    user = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: nil,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert_not user.valid?
    assert_includes user.errors[:last_name], "can't be blank"
  end

  test "validates email exists" do
    user = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: nil,
    )

    assert_not user.valid?
    assert_includes user.errors[:email], "can't be blank"
  end

  test "validates password digest exists" do
    user = User.new(
      password_digest: nil,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert_not user.valid?
    assert_includes user.errors[:password_digest], "can't be blank"
  end

  test "validates email is unique to each user" do
    email = "#{SecureRandom.alphanumeric}@mail.com"

    User.create!(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: email,
    )

    user_with_taken_email = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: email,
    )

    assert_not user_with_taken_email.valid?
    assert_includes user_with_taken_email.errors[:email], "has already been taken"
  end

  test "validates email is a valid email" do
    email = "bad"

    user = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: email,
    )

    assert_not user.valid?
    assert_includes user.errors[:email], "is invalid"
  end

  test "validates password is 8 characters or more" do
    user = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
      password: SecureRandom.alphanumeric(7)
    )

    assert_not user.valid?

    user.password = SecureRandom.alphanumeric(8)

    assert user.valid?
  end

  test "validates password can be empty" do
    user = User.new(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
      password: nil
    )

    assert user.valid?
  end

  test "has many videos" do
    user = users(:one)

    video_1 = user.videos.create!(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video_file.mp4", "video/mp4"),
    )

    video_2 = user.videos.create!(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video_file.mp4", "video/mp4"),
    )

    assert_includes user.videos, video_1
    assert_includes user.videos, video_2
  end

  test "has videos associated with its uploader" do
    user = users(:one)

    video = user.videos.create!(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video_file.mp4", "video/mp4"),
    )

    assert_equal user.id, video.uploader_id
    assert_includes user.videos, video
  end

  test "has videos destroyed on destruction" do
    user = users(:one)
    video = user.videos.create!(
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video_file.mp4", "video/file")
    )

    user.destroy!

    assert_nil Video.find_by(id: video.id)
  end

  test "has many comments" do
    user = users(:one)
    video = videos(:one)

    comment_1 = user.comments.create!(
      video_id: video.id,
      body: SecureRandom.alphanumeric,
    )

    comment_2 = user.comments.create!(
      video_id: video.id,
      body: SecureRandom.alphanumeric,
    )

    assert_includes user.comments, comment_1
    assert_includes user.comments, comment_2
  end

  test "has comments destroyed on destruction" do
    user = users(:one)
    video = videos(:one)
    comment = user.comments.create!(
      video_id: video.id,
      body: SecureRandom.alphanumeric,
    )

    user.destroy!

    assert_nil Comment.find_by(id: comment.id)
  end

  test "has many likes" do
    user = users(:one)
    video = videos(:one)
    comment = comments(:two)

    like_1 = user.likes.create!(
      likable_id: video.id,
      likable_type: "Video",
      was_liked: true,
    )

    like_2 = user.likes.create!(
      likable_id: comment.id,
      likable_type: "Video",
      was_liked: true,
    )

    assert_includes user.likes, like_1
    assert_includes user.likes, like_2
  end

  test "has likes destroyed on destruction" do
    user = users(:one)
    video = videos(:one)
    like = user.likes.create!(
      likable_id: video.id,
      likable_type: "Video",
      was_liked: true,
    )

    user.destroy!

    assert_nil Like.find_by(id: like.id)
  end

  test "has one channel" do
    user = User.create!(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert_not_nil user.channel
  end

  test "has channel associated with its owner" do
    user = User.create!(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    channel = user.channel

    assert_equal user.id, channel.owner_id
  end

  test "has channel destroyed upon destruction" do
    user = User.create!(
      password_digest: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )
    channel = user.channel

    user.destroy!

    assert_nil Channel.find_by(id: channel.id)
  end

  test "has many subscriptions" do
    user = users(:one)
    channel_one = channels(:one)
    channel_two = channels(:two)

    subscription_one = user.subscriptions.create!(channel: channel_one)
    subscription_two = user.subscriptions.create!(channel: channel_two)

    assert_includes user.subscriptions, subscription_one
    assert_includes user.subscriptions, subscription_two
  end

  test "has many subscribed channels" do
    user = users(:one)
    channel_one = channels(:one)
    channel_two = channels(:two)

    user.subscriptions.create!(channel: channel_one)
    user.subscriptions.create!(channel: channel_two)

    assert_includes user.subscribed_channels, channel_one
    assert_includes user.subscribed_channels, channel_two
  end

  test "has one avatar" do
    user = users(:one)
    avatar = file_fixture_upload("avatar.png", "image/png")

    user.avatar.attach(avatar)

    assert user.avatar.attached?
  end

  test "can generate session token" do
    token = User.generate_session_token

    assert_not_nil token
  end

  test "can generate unique session tokens" do
    token_1 = User.generate_session_token
    token_2 = User.generate_session_token

    assert_not_equal token_1, token_2
  end

  test "generates URL-safe base64 tokens" do
    token = User.generate_session_token

    assert_match(/\A[A-Za-z0-9_=-]+\z/, token)
  end

  test "can find a user by email and password" do
    user = User.create!(
      password: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    found = User.find_by_credentials(user.email, user.password)

    assert_equal user, found
  end

  test "creates a password digest upon setting a password" do
    user = User.create!(
      password: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert_not_nil user.password_digest
  end

  test "password digest is valid password hash" do
    user = User.create!(
      password: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    assert_equal BCrypt::Password.new(user.password_digest), user.password
  end

  test "checks if password is the correct password for the user" do
    user = User.create!(
      password: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    is_password = user.is_password?(user.password)

    assert is_password
  end

  test "checks if password is the wrong password for the user" do
    user = User.create!(
      password: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )
    wrong_password = "wrong"

    is_password = user.is_password?(wrong_password)

    assert_not is_password
  end

  test "can reset the user's session token" do
    user = User.create!(
      password: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )
    old_token = user.session_token

    user.reset_session_token!

    assert_not_equal old_token, user.session_token
  end

  test "can get channel ID" do
    user = User.create!(
      password: SecureRandom.alphanumeric,
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@mail.com",
    )

    channel_id = user.channel_id

    assert_equal user.channel.id, channel_id
  end
end
