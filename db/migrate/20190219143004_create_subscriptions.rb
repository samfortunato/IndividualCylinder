class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.references :channels,
        foreign_key: true,
        index: true

      t.references :users,
        foreign_key: true,
        index: true

      t.timestamps
    end
  end
end
