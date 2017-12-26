class CellphonesController < ApplicationController
  def index
    @cellphones = Cellphone
                    .filter_by_attrs(build_query(params))
  end

  private

  def build_query(params)
    if params_hash = filter_params(params)
      query_string = params_hash
                       .select { |key, value| value.present? }
                       .map { |key, value| "#{key} ILIKE ?" }
                       .join(" OR ")
      values       = params_hash
                       .select { |key, value| value.present? }
                       .map { |key, value| "%#{value}%" }

      [query_string, values].flatten
    end
  end

  def filter_params(params)
    result = Cellphone::FILTER_PARAMS.reduce({}) do |acc, attr|
      acc[attr] = params[attr] if params[attr].present?
      acc
    end

    result
  end
end
