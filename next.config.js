/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["rb.gy", "image.tmdb.org"],
  },
});

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["image.tmdb.org", "rb.gy"],
//   },
//   swcMinify: true,
// };

// module.exports = nextConfig;
