class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      # channel = Channel.new(owner_id: @user.id)
      # channel.save

      log_in(@user)

      render 'api/users/show'
    else
      render json: @user.errors.full_messages,
        status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])

    if @user
      render :show
    else
      render json: ['The requested user could not be found'],
        status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :avatar)
  end
end
