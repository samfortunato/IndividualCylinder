class Api::SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save
      render json: @subscription
    else
      render json: @subscription.errors.full_messages,
        status: 422
    end
  end

  def destroy
    @subscription = Subscription.where(
      channel_id: params[:subscription][:channel_id],
      user_id: params[:subscription][:user_id]
    )

    @subscription.first.destroy
    render json: @subscription
  end

  private

  def subscription_params
    params.require(:subscription).permit(:channel_id, :user_id)
  end
end
