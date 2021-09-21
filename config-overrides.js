const { alias } = require("react-app-rewire-alias");

module.exports = {
  webpack: config => {
    alias({
      "@assets": "./public/assets",
      "@dist": "./src/components/dist",
      "@elements": "./src/components/elements",
      "@pokemon": "./src/components/pokemon",
      "@api": "./src/api",
      "@redux": "./src/redux",
      "@routes": "./src/routes",
      "@css": "./src/css"
    })(config)

    return config;
  }
}