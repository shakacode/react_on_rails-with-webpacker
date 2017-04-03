module Webpacker
  class Configuration
    class << self
      def file_path
        Rails.root.join("client", "webpack", "paths.yml")
      end

      def output_path
        Rails.root.join(paths.fetch(:output, "public"))
      end
    end
  end

  class Webpacker::Env
    class << self
      def file_path
        Rails.root.join("client", "webpack", "paths.yml")
      end
    end
  end
end
