class ApplicationController < ActionController::Base
  
  before_action :plaid_client
  
  def plaid_client
    @plaid_client = Plaid::Client.new(env: Rails.env.development? ? :development : :production,
                                      client_id: ENV["DEV_PLAID_CLIENT_ID"],
                                      secret: ENV["DEV_PLAID_SECRET"],
                                      public_key: ENV["DEV_PLAID_PUBLIC_KEY"])
                                
  end
end
