json.search_results do
  json.video_ids @search_results.map { |video| video.id }
end

json.videos do
  @search_results.each do |video|
    json.set! video.id do
      json.extract! video, :id, :title, :uploader_id, :views, :description
      json.video_thumbnail_url url_for(video.video_thumbnail)
      json.upload_date "#{time_ago_in_words(
        video.created_at,
        include_seconds: true
      )} ago"
    end
  end
end

json.users do
  @search_results.each do |video|
    json.set! video.user.id do
      json.extract! video.user, :id, :first_name, :last_name, :channel_id
    end
  end
end
