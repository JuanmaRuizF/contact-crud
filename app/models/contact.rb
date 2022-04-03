class Contact < ApplicationRecord

  validates :firstName, presence: true
  validates :lastName, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phoneNumber, presence: true

end
