/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cms.usados.toyotoshi.com.py']
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['sequelize'],
        serverActions: true
    }
}
module.exports = nextConfig

