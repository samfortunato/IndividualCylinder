class Api::UsersController < ApplicationController
  def create
    @user = User.new(params[:user][:username])
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
