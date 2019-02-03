# == Schema Information
#
# Table name: comments
#
#  id         :bigint(8)        not null, primary key
#  reply_id   :integer
#  user_id    :integer          not null
#  video_id   :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  validates :body,
    presence: true

  belongs_to :user
  belongs_to :video
  has_many :comments
  has_many :likes,
    as: :likable
end
