# == Schema Information
#
# Table name: subscriptions
#
#  id         :bigint(8)        not null, primary key
#  channel_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subscription < ApplicationRecord
  belongs_to :channel
  # TODO: possibly add uniqueness constraint on here, so that a user can only subscribe to a channel once?
  # i don't know if that would ever be relevant...
  belongs_to :user
end
