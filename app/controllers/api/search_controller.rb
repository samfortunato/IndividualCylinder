class Api::SearchController < ApplicationController
  def create
    debugger
    debugger
    
    @search_results = Video.where(
      'title LIKE ?',
      "%#{params[:search][:search_terms]}%"
    )

    render :results
  end

  private

  def search_params
    params.require(:search).permit(:search_terms)
  end
end
