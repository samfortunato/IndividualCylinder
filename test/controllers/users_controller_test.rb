require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should create" do
    user_params = {
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@#{SecureRandom.alphanumeric}.com",
      password: SecureRandom.alphanumeric,
    }

    post api_users_path, params: { user: user_params }

    user = User.find_by(email: user_params[:email])

    assert_response :success
    assert_not_nil user
  end

  test "on create, should log the user in" do
    user_params = {
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@#{SecureRandom.alphanumeric}.com",
      password: SecureRandom.alphanumeric,
    }

    post api_users_path, params: { user: user_params }

    user = User.find_by(email: user_params[:email])

    assert_response :success
    assert_equal user.session_token, session[:session_token]
  end

  test "on create, should show the user's data" do
    user_params = {
      first_name: SecureRandom.alphanumeric,
      last_name: SecureRandom.alphanumeric,
      email: "#{SecureRandom.alphanumeric}@#{SecureRandom.alphanumeric}.com",
      password: SecureRandom.alphanumeric,
    }

    post api_users_path, params: { user: user_params }

    user = User.find_by(email: user_params[:email])
    body = JSON.parse(response.body)

    assert_response :success
    assert_not_nil body["id"]
    assert_not_nil body["channel_id"]
    assert_not_nil body["avatar_url"]
    assert_equal user.last_name, body["last_name"]
    assert_equal user.email, body["email"]
  end

  test "on create, gives errors if errors" do
    user_params = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    }

    post api_users_path, params: { user: user_params }

    errors = JSON.parse(response.body)

    assert_response :unprocessable_entity
    assert errors.length > 0
  end

  test "on create, does NOT create a user if errors" do
    user_params = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    }

    post api_users_path, params: { user: user_params }

    user = User.find_by(email: user_params[:email])

    assert_nil user
  end

  test "on create, does NOT log the user in if errors" do
    user_params = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    }

    post api_users_path, params: { user: user_params }

    assert_nil session[:session_token]
  end

  test "on show, shows the user's data" do
    user = users(:one)
    # FIXME: manually attaching a fake avatar to the user currently because rails fixture file attachment is dumb?????
    user.avatar.attach(io: StringIO.new("fake"), filename: "test.jpg")

    get api_user_path(user.id)

    body = JSON.parse(response.body)

    assert_response :success
    assert_not_nil body["id"]
    assert_not_nil body["channel_id"]
    assert_not_nil body["avatar_url"]
    assert_equal user.last_name, body["last_name"]
    assert_equal user.email, body["email"]
  end

  test "on show, gives errors if no user" do
    nonexistent_user_id = User.last.id + 1

    get api_user_path(nonexistent_user_id)

    assert_response :not_found
  end
end
