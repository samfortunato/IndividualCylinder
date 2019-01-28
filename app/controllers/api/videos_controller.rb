class Api::VideosController < ApplicationController
  def show
    @video = Video.find(params[:id])

    render :show
  end

  def create
    video_info_params = [
      video_params[:title],
      video_params[:description]
    ]
    
    if video_info_params.any?(&:empty?) || video_params[:video_file].nil?
      render json: ['All fields must be filled out'],
        status: 422
    else
      @video = Video.new(video_params)
      @video.uploader_id = current_user.id

      @video.save
      render :show
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video_file)
  end
end
