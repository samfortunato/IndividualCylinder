class LikesController < ApplicationController
  def create
    @like = null
    
    if params[:likable_type] == 'Video'
      @like = Video.find(params[:likable_id])
        .likes.new(like_params)
    elsif params[:likable_type] == 'Comment'
      @like = Comment.find(params[:likable_id])
        .likes.new(like_params)
    end

    if @like.save
      render json: @like
    else
      render json: @like.errors.full_messages
    end
  end

  def update
    @like = Like.find(params[:id])

    if @like.update_attributes(like_params)
      render json: @like
    else
      render json: @like.errors.full_messages
    end
  end

  def destroy
    @like = Like.find(params[:id])

    @like.destroy
    render json: @like
  end

  private

  def like_params
    params.require(:like).permit(:id, :likable_id, :likable_type, :was_liked, :user_id)
  end
end
