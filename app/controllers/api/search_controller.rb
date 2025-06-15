require 'uri'

class Api::SearchController < ApplicationController
  def create
    search_terms = search_params[:search_terms]&.strip

    @search_results = Video.where('title ILIKE ?', "%#{search_terms}%")

    render :results
  end

  private

  def search_params
    params.require(:search).permit(:search_terms)
  end
end
