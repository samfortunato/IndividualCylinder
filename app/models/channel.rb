class Channel < ApplicationRecord
  belongs_to :owner,
    class_name: 'User',
    foreign_key: :owner_id

  has_one_attached :banner_image
end
