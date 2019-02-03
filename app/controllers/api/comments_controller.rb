class Api::CommentsController < ApplicationController
  def create
    if !logged_in?
      render json: ['You must be logged in to comment'],
        status: 401
      return
    end
    
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.reply_id = nil unless @comment.reply_id

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end
  
  def show
    @comment = Comment.find_by(id: params[:id])

    render :show
  end
  
  def update
    @comment = Comment.find_by(id: params[:comment][:id])
    
    if @comment.update_attributes(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages,
        status: 422
    end
  end
  
  def destroy
    @comment = Comment.find_by(id: params[:id])

    @comment.destroy
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:id, :reply_id, :user_id, :video_id, :body)
  end
end
