// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig;

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      // issuer: {
      //   test: /\.(js|ts)x?$/,
      // },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
