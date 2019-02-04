class Api::LikesController < ApplicationController
  def create
    if already_liked?
      render json: ['You have already judged this entity'],
        status: 403

      return
    end

    @like = current_user.likes.new(like_params)

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

  def already_liked?
    Like.where(
      user_id: current_user.id,
      likable_id: params[:like][:likable_id],
      likable_type: params[:like][:likable_type]
    ).exists?
  end
end
