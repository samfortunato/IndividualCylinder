class AddViewsToVideos < ActiveRecord::Migration[5.2]
  def change
    add_column :videos, :views, :integer,
      default: 0
  end
end
