# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#

class User < ApplicationRecord
  before_validation :ensure_session_token
  after_create_commit :ensure_profile_picture

  validates :first_name, :last_name, :email, :password_digest,
    presence: true

  validates :email,
    uniqueness: true

  validates :password,
    length: { minimum: 8 },
    allow_nil: true

  has_many :videos,
    class_name: 'Video',
    foreign_key: :uploader_id,
    dependent: :destroy

  has_many :comments,
    dependent: :destroy

  has_many :likes,
    dependent: :destroy

  has_one :channel,
    class_name: 'Channel',
    foreign_key: :owner_id,
    dependent: :destroy

  has_many :subscriptions

  has_many :subscribed_channels,
    through: :subscriptions,
    source: :channel

  has_one_attached :avatar

  attr_reader :password

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user

    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    bcrypt_pass = BCrypt::Password.new(self.password_digest)
    bcrypt_pass.is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def channel_id
    self.channel.id
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def ensure_profile_picture
    unless self.avatar.attached?
      self.avatar.attach(
        io: File.open(Rails.root.join('app', 'assets', 'images', 'default-profile-picture.png')),
        filename: 'default-profile-picture.png',
        content_type: 'image/png'
      )
    end
  end
end
