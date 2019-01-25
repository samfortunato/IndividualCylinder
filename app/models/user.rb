class User < ApplicationRecord
  before_validation :ensure_session_token
  
  validates :first_name, :last_name, :email, :password_digest,
    presence: true
  validates :email,
    uniqueness: true
  validates :password,
    length: { minimum: 8 },
    allow_nil: true

  has_many :videos

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

  private
  
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
