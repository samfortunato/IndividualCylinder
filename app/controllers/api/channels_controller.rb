class Api::ChannelsController < ApplicationController
  def show
    @channel = Channel.find(params[:id])

    render :show
  end

  def update
    @channel = Channel.find(params[:id])

    if @channel.update_attributes(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:id, :description, :banner_image)
  end
end
