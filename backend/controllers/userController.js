// // 引入 User 模型，这样我们的“服务员”才能和“后厨”沟通
// const User = require('../models/userModel');
// // 引入 jsonwebtoken，这是制作“通行证”(Token)的工具
// const jwt = require('jsonwebtoken');

// // 这是一个辅助函数，专门用来生成 JWT Token
// const generateToken = (id) => {
//     // jwt.sign() 是核心方法，它需要三个参数：
//     // 1. payload (荷载): 我们想存入Token的信息，这里只存了用户的唯一ID
//     // 2. secret (密钥): 一个保密的字符串，用来给Token签名，我们稍后会配置在.env文件里
//     // 3. options (选项): 比如设置Token的有效期，这里是 '30d' (30天)
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: '30d',
//     });
// };

// // --- 注册用户的具体逻辑 ---
// const registerUser = async (req, res) => {
//     // 从请求的 body 中，把 username, email, password 解构出来
//     // (req.body 里的数据是前端发送过来的 JSON 数据)
//     const { username, email, password } = req.body;

//     // 服务员去后厨(User模型)问：有没有一个 email 是这个的？
//     const userExists = await User.findOne({ email });

//     // 如果后厨说“已经有了”，就告诉顾客“用户已存在”
//     if (userExists) {
//         res.status(400).json({ message: 'User already exists' });
//         return; // 提前结束函数
//     }

//     // 如果后厨说“没有”，就让后厨用这些原料(username, email, password)做一道新菜(创建新用户)
//     // 注意：密码加密的逻辑在 Model 文件里，服务员不关心这个过程
//     const user = await User.create({ username, email, password });

//     // 如果后厨成功做好了这道菜(成功创建了用户)
//     if (user) {
//         // 返回 201 Created 状态码，并把新用户的基本信息和一张“通行证”(Token)返回给顾客
//         res.status(201).json({
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             token: generateToken(user._id),
//         });
//     } else {
//         // 如果因为某些原因失败了，就告诉顾客“无效的用户数据”
//         res.status(400).json({ message: 'Invalid user data' });
//     }
// };

// // --- 登录用户的具体逻辑 ---
// const authUser = async (req, res) => {
//     const { email, password } = req.body;

//     // 服务员去后厨问：有没有一个 email 是这个的？
//     const user = await User.findOne({ email });

//     // 如果后厨找到了这个用户，并且( && )用户自带的那个特殊技能 matchPassword() 返回 true
//     if (user && (await user.matchPassword(password))) {
//         // 就把这个用户的基本信息和一张新的“通行证”返回给顾客
//         res.json({
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             token: generateToken(user._id),
//         });
//     } else {
//         // 如果用户不存在，或者密码对不上，就告诉顾客“邮箱或密码无效”
//         res.status(401).json({ message: 'Invalid email or password' });
//     }
// };

// // 把这两个“服务员”函数导出，给 userRoutes.js 使用
// module.exports = { registerUser, authUser };


const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
};

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    const userExists = await User.findOne({email});

    //400 = Bad Request  --- user issues
    if(userExists){
        res.status(400).json({message:'user already exists'});
        return;
    }

    const user = await User.create({ username, email, password});

    if(user){
        //201 = Created --- create successfully
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({message: 'Invalid user data'});
    }
};

const authUser = async (req,res) => {
    const{ email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401).json({message: 'Invalid email or password'});
    }
};

module.exports = { registerUser,authUser };

//500 = Server Error