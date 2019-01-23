class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      log_in(@user)
      render :create
    else
      flash.now[:errors] = ['Invalid username or password']
      render :errors
    end
  end

  def destroy
    log_out
  end
end
