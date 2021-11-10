const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ENVS = [
  ["development", "dev"],
  ["production", "prod"],
];

const augmentEnv = (env) => {
  if (!env) {
    env = {};
  }
  let matchingEnv = ENVS.find((nodeEnv) => nodeEnv.some((name) => env.NODE_ENV === name || env[name]));
  if (!matchingEnv) matchingEnv = ENVS[0];
  env.NODE_ENV = matchingEnv[0];
  env[matchingEnv[matchingEnv.length - 1]] = true;
  env.mode = env.dev ? "development" : "production";
  return env;
};

const rootDir = path.resolve(__dirname);
const publicDir = path.resolve(rootDir, "public");
const srcDir = path.resolve(rootDir, "src");
const distDir = path.resolve(rootDir, "dist");

const extensions = [".tsx", ".ts", ".js"];
const mainFields = ["module", "jsnext:main", "webpack", "browser", "main"];

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(publicDir, "index.html"),
    inject: "body",
    // favicon: path.resolve(publicDir, "favicon.png"),
  }),
];

const babelLoader = (env) => ({
  test: /\.[tj]sx?$/,
  include: [path.resolve(rootDir, "public"), path.resolve(rootDir, "src")],
  use: [
    {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        cacheIdentifier: env.mode,
        envName: env.mode,
        retainLines: !!env.dev,
        configFile: path.resolve(rootDir, "babel.config.js"),
      },
    },
  ],
});

const tailwindLoader = {
  test: /\.css$/i,
  include: path.resolve(__dirname, "src"),
  use: ["style-loader", "css-loader", "postcss-loader"],
};

const devTools = {
  devtool: "cheap-module-source-map",
  devServer: {
    host: "localhost",
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: publicDir,
  },
};

const prodOptimization = {
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
  },
};

module.exports = (env) => {
  env = augmentEnv(env);
  return [
    {
      mode: env.mode,
      target: "web",
      context: srcDir,
      entry: {
        app: [require.resolve("regenerator-runtime/runtime"), path.resolve(srcDir, "index")],
      },
      output: {
        path: distDir,
        publicPath: "",
        filename: env.dev ? "public/js/[name].js" : "public/js/[name].[chunkhash:8].js",
        assetModuleFilename: "public/assets/[hash][ext][query]",
      },
      resolve: {
        extensions,
        mainFields,
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.platform": JSON.stringify(process.platform),
          "process.env": JSON.stringify({
            NODE_ENV: env.NODE_ENV,
          }),
        }),
        ...plugins,
      ],
      module: {
        rules: [babelLoader(env), tailwindLoader],
      },
      ...(env.dev ? devTools : prodOptimization),
    },
  ];
};
