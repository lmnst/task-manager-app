// const express = require('express');
// const router = express.Router();

// // 我们很快就会在下一步创建这个 controller 文件
// // 这行代码的意思是：去上级目录(../)的 controllers 文件夹里，
// // 找到 userController.js 文件，并从中导入 registerUser 和 authUser 这两个函数

// const { registerUser, authUser } = require('../controllers/userController');

// // 定义第一条路由规则：
// // 当收到一个 POST 类型的、访问路径为 /register 的请求时，
// // 就把这个请求交给 registerUser 这个函数去处理。

// router.post('/register', registerUser);

// // 定义第二条路由规则：
// // 当收到一个 POST 类型的、访问路径为 /login 的请求时，
// // 就把它交给 authUser 这个函数去处理。

// router.post('/login', authUser);

// // 把我们配置好的这个路由导出，给 index.js 使用

// module.exports = router;


const express = require('express');
const router = express.Router();
//extract these two functions from the imported object
const { registerUser, authUser } = require('../controllers/userController');

//router.HTTP(URL, callback function)
//      post/get
router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;