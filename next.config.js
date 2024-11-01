const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'ga-t.yamata-youchien.com',
      'ga.yamata-youchien.com',
      '*.s3.ap-northeast-1.amazonaws.com',
      's3.ap-northeast-1.amazonaws.com',
    ],
  },
};

module.exports = withNextIntl(nextConfig);
