class RemoveAvatarUrlColumnFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :avatar_url
  end
end
