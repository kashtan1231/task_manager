const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/design/_typography.scss";
            @import "@/design/_colors.scss";
            @import "@/design/default.scss";
          `
      }
    }
  }
})
