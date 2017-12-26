require_relative 'boot'
require 'csv'
require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Hiring
  class Application < Rails::Application
    config.load_defaults 5.1

    config.active_job.queue_adapter = :sidekiq
  end
end
