import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',           //개발용 배포용 설정
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],        //바벨이 처리할 확장자 목록
    alias: {                                                    //상대경로 간편화
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@src': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@typings': path.resolve(__dirname, 'src/typings'),
    },
  },
  entry: {                                                      //메인파일위치, 파일의 시작점
    app: './src/index',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',                              //target에 적힌 브라우저에 자동으로 호환되도록 설정
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',                              //react코드 변환해줌
            '@babel/preset-typescript',                         //typescript 코드 변환해줌
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel'),
                '@emotion/babel-plugin'
              ],
            },
            production: {
              plugins: ['@emotion'],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ //타입스크립트 검사할경우 blocking형태(검사시에 다음동작 막음) 로 검사 fork설치시 동시에 검사해서 성능향상
      async: false,
      //eslint: {
      //  files: "./src/**/*",
      //},
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),//PROCESS_ENV, NODE_ENV를 프론트엔드에서도 접근할수 있도록 해줌
  ],
  output: {                                                         //결과물이 생성되는 경로
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    clean: true,
  },

  devServer: {
    historyApiFallback: true, // react router
    contentBase: path.join(__dirname, "public"), // 콘텐츠를 제공할 경로지정
    port: 3090,
    publicPath: '/dist/',
    proxy: {//front에서 보내는 /api에 대한 주소는 target주소로 바꿔줌
      '/api/': {
        target: 'http://localhost:3095',
        changeOrigin: true,
      },
    },
  }
};

//개발환경시 사용될 플러그인
if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  //config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}

//배포시 사용되는 플러그인 
/* if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
} */

export default config;