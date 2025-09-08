import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs:['app', 'components', 'services']
    },
    images: {
    qualities: [25, 50, 75, 80, 90],
  },
};

export default withNextIntl(nextConfig);
