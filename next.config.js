/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // static export for sujanmagar.info.np hosting
  trailingSlash: true,     // /blog/ instead of /blog  (better for static hosts)
  images: {
    unoptimized: true,     // required for static export
  },
}

module.exports = nextConfig
