module.exports = {
  module: {
    rules: [
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.xlsx?$/,
        loader: 'excel-loader'
      },
      {
        test:/\.mp3$/i,
        use:'file-loader'
      },
      {
        test: /\.jpg$/i,
        use:'file-loader'
      },
    ]
  }
}