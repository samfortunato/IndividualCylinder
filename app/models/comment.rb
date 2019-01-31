class Comment < ApplicationRecord
  validates :body,
    presence: true

  belongs_to :user
  belongs_to :video
  has_many :comments
end
