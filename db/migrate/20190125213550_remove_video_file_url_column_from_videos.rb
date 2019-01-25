class RemoveVideoFileUrlColumnFromVideos < ActiveRecord::Migration[5.2]
  def change
    remove_column :videos, :video_file_url
  end
end
