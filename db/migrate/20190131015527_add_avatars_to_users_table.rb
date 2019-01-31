class AddAvatarsToUsersTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :avatar_url, :string,
      null: false
     
    add_index :users, :avatar_url
  end
end
