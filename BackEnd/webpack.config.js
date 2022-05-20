const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'production',
  target: "node",
  entry: path.resolve(__dirname,'dist','shared','infra','http','server.js'),
  output: {
    path: path.resolve(__dirname, "distBuild"),
    filename: "bundle-back.js"
  },
  resolve:{
    extensions: ['.js', '.ts'],
  },
  externals: [nodeExternals()],
  module:{
    rules: [
        {
            test: /\.(j|t)sx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },
        
    ],
  } 
};