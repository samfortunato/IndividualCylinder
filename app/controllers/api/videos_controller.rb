class Api::VideosController < ApplicationController
  def show
    @video = Video.find(params[:id])

    render :show
  end

  def create
    @video = Video.new(video_params)
    @video.uploader_id = current_user.id

    if @video.save
      render json: { message: 'Video uploaded successfully.' }
    else
      render json: @video.errors.full_messages
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video_file)
  end
end
