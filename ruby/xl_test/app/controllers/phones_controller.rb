class PhonesController < ApplicationController
  before_action :ensure_csv_file, only: :import

  def index
    @phones = Phone.all
  end

  def import
    Phone.import(params[:file])
      redirect_to root_url, notice: 'Data was succesfully imported.'
    rescue StandardError => exception
      redirect_to root_url, notice: 'Could not import data.'
  end

  def new; end

  private

  def ensure_csv_file
    if params[:file].nil?
      flash[:error] = 'No File Uploaded'
      redirect_to(root_url)
    elsif params[:file].content_type != 'text/csv'
      flash[:error] = 'File type must be csv: #{params[:file].original_filename}
      redirect_to(root_url)
    end
  end
end
