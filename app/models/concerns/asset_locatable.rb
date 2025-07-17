module AssetLocatable
  extend ActiveSupport::Concern

  included do
    def get_asset_path(folder, filename)
      Rails.env.test? ?
        Rails.root.join("test", "fixtures", "files", filename) :
        Rails.root.join("app", "assets", folder, filename)
    end
  end
end
