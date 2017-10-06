import webpack from "webpack";
import path from "path";

function src(...args) {
  return path.resolve(__dirname, "src", ...args);
}

function dest(...args) {
  return path.resolve(__dirname, "dist", ...args);
}

const config = {
  entry: [
    src("index.js")
  ],

  devtool: "eval-source-map",

  resolve: {
    extensions: [".js",".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader"
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

export default config;
