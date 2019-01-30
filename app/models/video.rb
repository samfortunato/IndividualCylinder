class Video < ApplicationRecord
  validates :title, :description,
    presence: true
  validate :ensure_video_file

  belongs_to :user,
    class_name: 'User',
    foreign_key: :uploader_id

  has_one_attached :video_file
  has_one_attached :video_thumbnail

  private

  def ensure_video_file
    if !self.video_file.attached?
      errors[:video_file] << 'must be attached'
    end
  end
end
