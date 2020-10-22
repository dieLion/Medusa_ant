const { baseURL } = require("./src/utils/request")

const faceConfig = () =>{
    return{
        // 基础路径,打包发布的时候修改为后端发布服务地址
        basePath: 'http://0.0.0.0/api/',
        imgPath:'http://0.0.0.0:50000/image/'
    }
}

module.exports = faceConfig()