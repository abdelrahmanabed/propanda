/** @type {import('next').NextConfig} */
const nextConfig ={
  
    reactStrictMode: true,
  images: {

    remotePatterns: [
      {
      
        protocol: 'https',
        hostname: 'propanda-server.onrender.com',

      },
    ],
  },
  };

export default nextConfig;
