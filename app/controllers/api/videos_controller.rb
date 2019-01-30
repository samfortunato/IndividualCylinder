class Api::VideosController < ApplicationController
  include ActionView::Helpers::DateHelper
  
  def index
    @all_videos = Video.all
    render :index
  end
  
  def show
    @video = Video.find_by(id: params[:id])

    if @video
      @video.views += 1
      @video.save
      
      render :show
    else
      render json: ['Video not found'],
        status: 404
    end
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

      if !@video.video_thumbnail.attached?
        @video.video_thumbnail.attach(
          io: File.open(Rails.root.join('app', 'assets', 'images', 'default-thumbnail.png')),
          filename: 'default-thumbnail.png',
          content_type: 'image/png'
        )
      end

      @video.save
      render :show
    end
  end

  def update
    @video = Video.find_by(id: params[:video][:id])

    if @video.update_attributes(video_params)
      render :show
    else
      render json: ['Invalid video parameters'],
        status: 422
    end
  end
  
  def destroy
    @video = Video.find_by(id: params[:id])

    if @video.destroy
      render json: @video.id
    else
      render json: ['Delete error']
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :video_file, :video_thumbnail)
  end
end
