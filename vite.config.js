import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Környezeti változók betöltése
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Alapkönyvtár
    root: './',
    
    // Public könyvtár (statikus fájlok)
    publicDir: 'public',
    
    // Build kimenet
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      
      // Chunk size warningok letiltása (nagy HTML fájl miatt)
      chunkSizeWarningLimit: 1000,
      
      // Rollup opciók
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          // Asset fájlnevek
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      }
    },
    
    // Dev server konfiguráció
    server: {
      port: 3000,
      open: true,
      cors: true,
      
      // API proxy beállítások (CORS megkerülés fejlesztés közben)
      proxy: {
        '/api/tomtom': {
          target: 'https://api.tomtom.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tomtom/, ''),
          headers: {
            'X-Api-Key': env.VITE_TOMTOM_API_KEY
          }
        },
        '/api/openweather': {
          target: 'https://api.openweathermap.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/openweather/, '')
        }
      }
    },
    
    // Preview server (build után)
    preview: {
      port: 4173,
      open: true
    },
    
    // Környezeti változók prefix
    envPrefix: 'VITE_',
    
    // CSS konfiguráció
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        // Ha SCSS-t használnál a jövőben:
        // scss: {
        //   additionalData: `@import "./src/styles/variables.scss";`
        // }
      }
    },
    
    // Optimalizálás
    optimizeDeps: {
      include: ['chart.js', 'leaflet']
    },
    
    // Alias-ok (rövidebb import path-ok)
    resolve: {
      alias: {
        '@': resolve(__dirname, './assets'),
        '@css': resolve(__dirname, './assets/css'),
        '@js': resolve(__dirname, './assets/js'),
        '@config': resolve(__dirname, './assets/js/config'),
        '@modules': resolve(__dirname, './assets/js/modules'),
        '@services': resolve(__dirname, './assets/js/services'),
        '@utils': resolve(__dirname, './assets/js/utils')
      }
    },
    
    // Plugin-ek (ha szükséges)
    plugins: [
      // Példa: HTML beillesztés plugin
      // htmlPlugin({
      //   inject: {
      //     data: {
      //       title: 'Százhalombatta Smart City Dashboard'
      //     }
      //   }
      // })
    ]
  };
});
