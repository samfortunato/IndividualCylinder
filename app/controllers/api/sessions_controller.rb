class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render :json
    else
      flash.now[:errors] = ['Invalid username or password']
      render :json
    end
  end

  def destroy
    log_out

    # ???
    redirect_to new_session_url
  end
end
