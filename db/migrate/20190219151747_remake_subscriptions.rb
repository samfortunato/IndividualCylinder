class RemakeSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :channel_id,
        foreign_key: true,
        null: false

      t.integer :user_id,
        foreign_key: true,
        null: false

      t.timestamps
    end

    add_index :subscriptions, :channel_id
    add_index :subscriptions, :user_id
  end
end
