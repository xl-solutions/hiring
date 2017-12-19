json.extract! phone, :id, :manufacturer, :model, :color, :plan, :quantity, :price, :created_at, :updated_at
json.url phone_url(phone, format: :json)
