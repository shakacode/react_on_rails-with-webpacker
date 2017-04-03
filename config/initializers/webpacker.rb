class Webpacker::Configuration
  class << self
    def output_path
      Rails.root.join(paths.fetch(:output, "public"))
    end
  end
end
