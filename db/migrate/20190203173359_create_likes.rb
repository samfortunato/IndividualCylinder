class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :likable_id, null: false
      t.string :likable_type, null: false
      t.boolean :was_liked, null: false
      t.integer :user_id, null: false
      
      t.timestamps
    end

    add_index :likes, [:likable_id, :likable_type, :user_id]
  end
end
