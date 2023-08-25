/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/toyousadoscms/images/**'
            }, 
            {
                protocol: 'http',
                hostname: 'cms.toyousados.nosbase.com',
                port: '',
                pathname: '/images/**'
            }
        ]
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['sequelize'],
        serverActions: true
    }
}
module.exports = nextConfig


 // async redirects() {
    //     return [
    //       {
    //         source: '/cars/edit/:path*',
    //         has: [
    //           {
    //             type: 'query',
    //             key: 'id',
    //           },
    //         ],
    //         permanent: false,
    //         destination: '/',
    //       },
    //     ]
    //   },
