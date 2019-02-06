class Api::LikesController < ApplicationController
  def create
    if !logged_in?
      render json: ['You must be logged in to do that'],
        status: 401

      return
    end

    was_liked = ActiveRecord::Type::Boolean.new.cast(
      params[:like][:was_liked]
    )

    if already_liked? && was_liked == false
      existing_like.destroy
    elsif already_disliked? && was_liked == true
      existing_like.destroy
    elsif already_liked? && was_liked == true
      render json: existing_like.destroy

      return
    elsif already_disliked? && was_liked == false
      render json: existing_like.destroy

      return
    end

    @like = current_user.likes.new(like_params)

    if @like.save
      render json: @like
    else
      render json: @like.errors.full_messages
    end
  end

  private

  def like_params
    params.require(:like).permit(:id, :likable_id, :likable_type, :was_liked)
  end

  def existing_like
    Like.where(
      user_id: current_user.id,
      likable_id: params[:like][:likable_id],
      likable_type: params[:like][:likable_type]
    ).first
  end

  def already_liked?
    Like.where(
      user_id: current_user.id,
      likable_id: params[:like][:likable_id],
      likable_type: params[:like][:likable_type],
      was_liked: true
    ).exists?
  end

  def already_disliked?
    Like.where(
      user_id: current_user.id,
      likable_id: params[:like][:likable_id],
      likable_type: params[:like][:likable_type],
      was_liked: false
    ).exists?
  end
end
