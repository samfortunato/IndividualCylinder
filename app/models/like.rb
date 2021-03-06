# == Schema Information
#
# Table name: likes
#
#  id           :bigint(8)        not null, primary key
#  likable_id   :integer          not null
#  likable_type :string           not null
#  was_liked    :boolean          not null
#  user_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Like < ApplicationRecord
  validates :was_liked,
    inclusion: { in: [true, false] }
  
  belongs_to :likable,
    polymorphic: true
end
