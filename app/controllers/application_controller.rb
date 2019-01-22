class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end
  
  def log_in(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def log_out
    @current_user.reset_session_token!
    session[:session_token] = nil

    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  # is this still proper execution of ensure_logged_in method
  #   now that frontend auth is in the picture?
  def ensure_logged_in
    redirect_to new_session_url if !logged_in?
  end
end
