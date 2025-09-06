import { type MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Atravelikes',
    short_name: 'Atravelikes',
    description: 'Discover and book flights, hotels, and more. Atravelikes makes your travel planning seamless and enjoyable.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F0F8FF',
    theme_color: '#4682B4',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}