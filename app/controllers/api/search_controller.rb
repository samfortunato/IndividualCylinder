require 'uri'

class Api::SearchController < ApplicationController
  def create
    search_terms = URI.decode(params[:search][:search_terms])
    @search_results = Video.where('title ILIKE ?', "%#{search_terms}%")

    render :results
  end

  private

  def search_params
    params.require(:search).permit(:search_terms)
  end
end
