require "test_helper"

class SubscriptionTest < ActiveSupport::TestCase
  test "belongs to a channel" do
    user = users(:one)
    channel = channels(:one)

    subscription = Subscription.create!(user:, channel:)

    assert_equal subscription.channel, channel
  end

  test "belongs to a user" do
    user = users(:one)
    channel = channels(:one)

    subscription = Subscription.create!(user:, channel:)

    assert_equal subscription.user, user
  end
end
