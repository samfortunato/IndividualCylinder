ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

# TODO: open up an issue for this. this was insane, lol? fucking file path sanitization...
# i should be able to nest fixture files. wtf!!!!!
#
# Fix for ActiveStorage nested fixture paths bug
# module ActiveStorage
#   class FixtureSet
#     def file_fixture(fixture_name)
#       begin
#         super(fixture_name)
#       rescue ArgumentError => e
#         if fixture_name.include?('-')
#           # Try converting first dash to slash (videos-file.mp4 -> videos/file.mp4)
#           restored_name = fixture_name.sub('-', '/')
#           if File.exist?(File.join(file_fixture_path, restored_name))
#             super(restored_name)
#           else
#             raise e
#           end
#         else
#           raise e
#         end
#       end
#     end
#   end
# end
