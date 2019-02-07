# == Schema Information
#
# Table name: channels
#
#  id          :bigint(8)        not null, primary key
#  owner_id    :integer          not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Channel < ApplicationRecord
  belongs_to :owner,
    class_name: 'User',
    foreign_key: :owner_id

  has_many :videos,
    through: :owner

  has_one_attached :banner_image
end
