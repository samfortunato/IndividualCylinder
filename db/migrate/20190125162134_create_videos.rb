class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :video_file_url, null: false

      t.integer :uploader_id, null: false
      
      t.timestamps
    end

    add_index :videos, :title
    add_index :videos, :uploader_id
  end
end
