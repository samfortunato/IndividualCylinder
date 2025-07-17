require "test_helper"

class VideosControllerTest < ActionDispatch::IntegrationTest
  include ActionDispatch::TestProcess::FixtureFile

  def login
    user = users(:one)

    post api_session_path, params: {
      user: {
        email: user.email,
        password: "password",
      },
    }
  end

  test "on index, show all video data" do
    video_1 = videos(:one)
    video_2 = videos(:two)

    get api_videos_path

    parsed = JSON.parse(response.body)
    assert_response :success
    assert_not_nil parsed["videos"][video_1.id.to_s]
    assert_not_nil parsed["videos"][video_2.id.to_s]
  end

  test "on show, show specific video data by ID" do
    video = videos(:one)

    get api_video_path(video.id)

    parsed = JSON.parse(response.body)
    assert_response :success
    assert_equal video.id, parsed["video"]["id"]
  end

  test "on show, update view count by 1" do
    video = videos(:one)

    assert_equal 0, video.views

    get api_video_path(video.id)

    assert_equal 1, video.reload.views
  end

  test "on show, returns not found if not found" do
    nonexistent_video_id = -1

    get api_video_path(nonexistent_video_id)

    assert_response :not_found
  end

  test "on create, creates a video" do
    login
    video_params = {
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video-file.mp4", "video/mp4"),
    }

    post api_videos_path, params: { video: video_params }

    assert_response :success
    assert_not_nil Video.find_by(title: video_params[:title])
  end

  test "on create, associates video with current user as its uploader" do
    user = users(:one)
    post api_session_path, params: {
      user: {
        email: user.email,
        password: "password",
      },
    }

    video_params = {
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video-file.mp4", "video/mp4"),
    }

    post api_videos_path, params: { video: video_params }

    video = Video.find_by(title: video_params[:title])
    assert_equal user.id, video.uploader_id
  end

  test "on create, can also accept a video thumbnail" do
    login
    video_params = {
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video-file.mp4", "video/mp4"),
      video_thumbnail: file_fixture_upload("default-video-thumbnail.png", "video/png"),
    }

    post api_videos_path, params: { video: video_params }

    video = Video.find_by(title: video_params[:title])
    assert_response :success
    assert_not_nil video
    assert_not_nil video.video_thumbnail
  end

  test "on create, provides response data about the video created" do
    login
    video_params = {
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
      video_file: file_fixture_upload("video-file.mp4", "video/mp4"),
      video_thumbnail: file_fixture_upload("default-video-thumbnail.png", "video/png"),
    }

    post api_videos_path, params: { video: video_params }

    video = Video.find_by(title: video_params[:title])
    parsed = JSON.parse(response.body)
    assert_not_nil body
    assert_not_nil parsed["video"]
    assert_equal video.id, parsed["video"]["id"]
  end

  test "on create, errors if malformed request" do
    login
    video_params = {
      title: "",
      description: "",
    }

    post api_videos_path, params: { video: video_params }

    assert_response :unprocessable_entity
  end

  test "on create, errors if no video is provided" do
    login
    video_params = {
      title: SecureRandom.alphanumeric,
      description: SecureRandom.alphanumeric,
    }

    post api_videos_path, params: { video: video_params }

    assert_response :unprocessable_entity
  end

  test "on update, updates the specified video with updated params" do
    login
    video = videos(:one)
    video_params = {
      # FIXME: this needs to be taken out, and to only use the ID in the path of the request.
      # this has to be done for now, because i am grabbing ID from the body of the request in the controller,
      # instead of from the path.
      id: video.id,
      title: SecureRandom.alphanumeric,
    }

    patch api_video_path(video.id), params: { video: video_params }

    video.reload
    assert_equal video_params[:title], video.title
  end

  test "on update, denies update if current user does not match video's uploader" do
    login
    video = videos(:two)
    video_params = {
      # FIXME: this needs to be taken out, and to only use the ID in the path of the request.
      # this has to be done for now, because i am grabbing ID from the body of the request in the controller,
      # instead of from the path.
      id: video.id,
      title: SecureRandom.alphanumeric,
    }

    patch api_video_path(video.id), params: { video: video_params }

    video.reload
    assert_not_equal video_params[:title], video.title
  end

  test "on update, errors if invalid params" do
    login
    video = videos(:one)
    video_params = {
      # FIXME: this needs to be taken out, and to only use the ID in the path of the request.
      # this has to be done for now, because i am grabbing ID from the body of the request in the controller,
      # instead of from the path.
      id: video.id,
      title: "",
    }

    patch api_video_path(video.id), params: { video: video_params }

    assert_response :unprocessable_entity
  end

  test "on destroy, deletes a video" do
    login
    video = videos(:one)

    delete api_video_path(video.id)

    assert_response :success
    assert_nil Video.find_by(id: video.id)
  end

  test "on destroy, gives back the deleted video's ID" do
    login
    video = videos(:one)

    delete api_video_path(video.id)
    parsed = JSON.parse(body)

    assert_equal parsed, video.id
  end

  test "on destroy, fails if the video being deleted's uploader does not match the current user" do
    skip "TODO: currently, controller endpoint logic does not handle this. implement, as we can't allow anyone to just delete any video!"

    login
    video = videos(:two)

    delete api_video_path(video.id)

    assert_response :forbidden
  end

  test "on destroy, errors if invalid params" do
    skip "TODO: need to make controller actually reflect these tests, as endpoint is missing HTTP response codes, and it can't handle nonexistent video currently"

    login
    nonexistent_video_id = -1

    delete api_video_path(nonexistent_video_id)

    assert_response :not_found
    assert_includes body, "Encountered an error when trying to delete video."
  end
end
