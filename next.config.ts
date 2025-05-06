import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
        port: "",
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  // Update the serverExternalPackages key
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;

// // import type { NextConfig } from "next";

// const nextConfig = {
//   experimental: {
//     appDir: true,
//     serverComponentsExternalPackages: ["mongoose"],
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//       },
//     ],
//   },
//   webpack(config) {
//     config.experiments = {
//       ...config.experiments,
//       topLevelAwait: true,
//     };
//     return config;
//   },
// };

// export default nextConfig;
