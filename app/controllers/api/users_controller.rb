class Api::UsersController < ApplicationController
  def create
    @user = User.new(
      first_name: params[:user][:first_name],
      last_name: params[:user][:last_name],
      username: params[:user][:email]
    )
    @user.password = params[:user][:password]

    if @user.save
      log_in(@user)
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
      render :json
    end
  end
end
