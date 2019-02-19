class Api::SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save
      render json: {
        channel_id: @subscription.channel_id,
        channel_owner_id: @subscription.channel.owner_id
      }
    else
      render json: @subscription.errors.full_messages,
        status: 422
    end
  end

  def destroy
    @subscription = Subscription.where(
      channel_id: params[:subscription][:channel_id],
      user_id: params[:subscription][:user_id]
    ).first

    @subscription.destroy
    render json: {
      channel_id: @subscription.channel_id,
      channel_owner_id: @subscription.channel.owner_id
    }
  end

  private

  def subscription_params
    params.require(:subscription).permit(:channel_id, :user_id)
  end
end
