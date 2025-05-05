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
                theme_color: '#86c06c',
                icons: [
                    {
                        "src": "/sprites/fish.svg",
                        "type": "image/svg+xml",
                        "sizes": "any",
                        "purpose": "any"
                    },
                    {
                        "src": "/sprites/icon-192.png",
                        "type": "image/png",
                        "sizes": "192x192",
                    },
                    {
                        "src": "/sprites/icon-512.png",
                        "type": "image/png",
                        "sizes": "512x512",
                    },
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