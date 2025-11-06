// // 引入 mongoose 这个库，它是我们操作MongoDB的工具
// const mongoose = require('mongoose');

// // 定义一个异步函数 connectDB，专门用来连接数据库
// const connectDB = async () => {
//     // 使用 try...catch 来捕获可能发生的异常（比如密码错了、网络问题）
//     try {
//         // 尝试使用 mongoose 连接到数据库
//         // process.env.MONGO_URI 会自动从 .env 文件中读取我们配置的连接字符串
//         const conn = await mongoose.connect(process.env.MONGO_URI);
        
//         // 如果连接成功，就在终端打印一条成功信息，并显示连接的主机名
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         // 如果连接失败，就在终端打印错误信息
//         console.error(`Error connecting to MongoDB: ${error.message}`);
        
//         // 连接数据库是核心功能，如果失败了，整个应用就没法跑了，所以直接退出程序
//         process.exit(1);
//     }
// };

// // 把这个 connectDB 函数导出，这样其他文件（比如 index.js）就能导入并使用它了
// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error) {
        console.error(`Error connecting to MongoDB: ${error.message}`)
    }
}
module.exports = connectDB;