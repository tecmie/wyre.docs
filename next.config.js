const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const webpack = require('webpack')

let config = {
  optimizeFonts: true,
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
  compiler: {},
  async redirects() {
    return [
      {
        source: '/docs/core/overview',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/introduction',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/core/getting-started',
        destination: '/docs/core/quickstarts',
        permanent: true,
      },
      {
        source: '/docs/components/data-display/list',
        destination: '/docs/components/data-display/structured-list',
        permanent: true,
      },
    ]
  },
  webpack: (config, { defaultLoaders }) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    config.resolve = {
      ...config.resolve,
    }
    return config
  },
}

const isNextDev = process.argv.includes('dev')

if (isNextDev) {
  config = withContentlayer(config)
}

module.exports = withBundleAnalyzer(config)
