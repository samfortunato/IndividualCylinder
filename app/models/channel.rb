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
  after_create_commit :ensure_default_banner

  belongs_to :owner,
    class_name: 'User',
    foreign_key: :owner_id
  has_many :videos,
    through: :owner
  has_many :subscriptions
  has_many :subscribers,
    through: :subscriptions,
    source: :user
  has_one_attached :banner_image

  private

  def ensure_default_banner
    unless self.banner_image.attached?
      self.banner_image.attach(
        io: File.open(Rails.application.config.assets_path.join('images', 'default-banner-image.jpg')),
        filename: 'default-banner-image.jpg',
        content_type: 'image/jpeg'
      )
    end
  end
end
