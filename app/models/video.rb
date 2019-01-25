class Video < ApplicationRecord
  validates :title, :description,
    presence: true

  belongs_to :user,
    class_name: 'User',
    foreign_key: :uploader_id
    
  has_one_attached :video_file
end
