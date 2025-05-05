import { defineConfig } from 'vite';
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        VitePWA({
            manifest: {
                name: 'Bloque Fish Game',
                short_name: 'BFG',
                description: 'Presented by Jnico',
                theme_color: '#DDDDDD',
                icons: [
                    {
                        "src": "/sprites/fish.svg",
                        "type": "image/svg+xml",
                        "sizes": "any",
                        "purpose": "any"
                    }
                ],
            },
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/api-game\.bloque\.app\/.*$/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 36000,
                            },
                            cacheableResponse: {
                                statuses: [ 0, 200 ],
                            }
                        }
                    }
                ]
            }
        }),
    ],
});