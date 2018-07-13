class UsersController < ApplicationController

  def connect_bank
  end

  def get_access_token
    exchange_token_response = @plaid_client.item.public_token.exchange(params['public_token'])
    access_token = exchange_token_response['access_token']
    item_id = exchange_token_response['item_id']
    puts "access token: #{access_token}"
    puts "item id: #{item_id}"

    cookies[:plaid_access_token] = access_token

    render json: exchange_token_response.to_json
  end

  def transactions

    now = Date.today
    thirty_days_ago = (now - 30)
    begin
      transactions_response = @plaid_client.transactions.get(cookies[:plaid_access_token], thirty_days_ago, now)
    rescue Plaid::ItemError => e
      transactions_response = { error: {error_code: e.error_code, error_message: e.error_message}}
    end

    render json: transactions_response.to_json
  end

  def create_public_token

    public_token_response = @plaid_client.item.public_token.exchange(cookies[:plaid_access_token])
    content_type :json
    render json: public_token_response.to_json
  end

end
