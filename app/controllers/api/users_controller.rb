class Api::UsersController < ApplicationController
  def create
    @user = User.new(
      first_name: params[:user][:first_name],
      last_name: params[:user][:last_name],
      email: params[:user][:email],
      password: params[:user][:password]
    )

    if @user.save
      log_in(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages,
        status: 422
    end
  end

  # private

  # def user_params
  #   params.require(:user).permit(:first_name, :last_name, :email, :password)
  # end
end
