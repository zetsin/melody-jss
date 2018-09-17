module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    extra: {
      module: {
        rules: [
          {
            test: /\.twig$/,
            use: [
              'babel-loader', 
              {
                loader: 'melody-loader',
                options: {
                  plugins: ['idom']
                }
              }
            ]
          }
        ]
      },
    }
  }
}
