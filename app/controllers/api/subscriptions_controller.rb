class SubscriptionsController < ApplicationController
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
    @subscription = Subscription.find(params[:id])

    @subscription.destroy
    render json: @subscription
  end

  private

  def subscription_params
    params.require(:subscriptions).permit(:id, :channel_id, :user_id)
  end
end
