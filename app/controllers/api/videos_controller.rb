class Api::VideosController < ApplicationController
  def show
    @video = Video.find(params[:id])

    render :show
  end

  def create
    @video = Video.new(video_params)

    if @video.save
      render :show
    else
      render json: @video.errors.full_messages
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :uploader_id, :video_file)
  end
end
