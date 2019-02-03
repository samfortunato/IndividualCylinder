# == Schema Information
#
# Table name: videos
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  description :text             not null
#  uploader_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  views       :integer          default(0)
#

class Video < ApplicationRecord
  validates :title, :description,
    presence: true
  validate :ensure_video_file

  belongs_to :user,
    class_name: 'User',
    foreign_key: :uploader_id
  has_many :comments
  has_many :likes,
    as: :likable

  has_one_attached :video_file
  has_one_attached :video_thumbnail

  private

  def ensure_video_file
    if !self.video_file.attached?
      errors[:video_file] << 'must be attached'
    end
  end
end
