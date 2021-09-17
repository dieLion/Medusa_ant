// const { baseURL } = require("@/api/request")

const faceConfig = () => {
  return {
    // 基础路径,打包发布的时候修改为后端发布服务地址
    basePath: 'https://127.0.0.1/api/',
    imgPath: 'https://127.0.0.1/s/'

  }
}

module.exports = faceConfig()