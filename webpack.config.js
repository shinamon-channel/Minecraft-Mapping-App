const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, 'www/js/pages.js'), //エントリーポイント
  output: {
    path: path.resolve(__dirname, 'www/dist'), //outputディレクトリ
    filename: 'bundle.js' //filename
  },
  module: { //トランスパイルする拡張子とローダの設定
    rules: [ //test: 拡張子指定 e.g. /\.txt/, use: ローダ指定 e.g. raw-loader
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [{
        loader: '@riotjs/webpack-loader',
        options: {
          hot: true
          }
        }]}, {
          test:/\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
    ]
  }
}
