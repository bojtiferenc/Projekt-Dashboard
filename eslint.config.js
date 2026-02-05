// ==========================================
// ESLINT KONFIGURÁCIÓ
// Százhalombatta Smart City Dashboard
// ==========================================

export default [
  {
    // Melyik fájlokat vizsgálja
    files: ['**/*.js', '**/*.mjs'],
    
    // Nyelvtan beállítások
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser környezet
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        
        // Chart.js
        Chart: 'readonly',
        
        // Leaflet
        L: 'readonly',
        
        // Google Maps
        google: 'readonly',
        
        // Vite env
        import: 'readonly'
      }
    },
    
    // Szabályok
    rules: {
      // ========== HIBÁK ==========
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      'no-undef': 'error',
      'no-console': ['warn', { 
        allow: ['warn', 'error', 'info'] 
      }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      
      // ========== BEST PRACTICES ==========
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // ========== STYLE ==========
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 
        avoidEscape: true,
        allowTemplateLiterals: true 
      }],
      'indent': ['error', 4, { 
        SwitchCase: 1 
      }],
      'comma-dangle': ['error', 'never'],
      'arrow-spacing': 'error',
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      
      // ========== ASYNC/AWAIT ==========
      'no-async-promise-executor': 'error',
      'require-await': 'warn',
      
      // ========== COMMENTS ==========
      'spaced-comment': ['error', 'always', {
        markers: ['/']
      }]
    }
  },
  
  // Prettier integráció
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.vite/**'
    ]
  }
];
