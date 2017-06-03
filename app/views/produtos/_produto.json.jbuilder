json.extract! produto, :id, :quantidade, :valor, :created_at, :updated_at
json.url produto_url(produto, format: :json)
