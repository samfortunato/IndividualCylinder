class ChangeUsersUsernameColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :username

    add_column :users, :first_name, :string,
      null: false
    add_column :users, :last_name, :string,
      null: false
    add_column :users, :email, :string,
      null: false
      
    add_index :users, :email,
      unique: true
  end
end
