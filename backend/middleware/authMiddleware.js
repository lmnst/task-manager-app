// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
// 注意：这里必须加 .js 后缀！
import User from '../models/userModel.js'; 

// 写法 1：直接导出函数 (推荐)
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 注意：你之前写的 select('-passwod') 拼写错了，应该是 password
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token verification failed. Unauthorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token, access denied' });
    }
};

// 如果用上面的 export const protect，最后这行 module.exports 就要删掉！
// const protect = async(req, res, next) => {
//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-passwod');
//             next();
//         } catch(error) {
//             console.error(error);
//             res.status(401).json({ message: 'Token verification failed. Unauthorized'});
//         }
//     }

//     if (!token) {
//         res.status(401).json({message:'No token, access denied'});
//     }
// };

// module.exports = protect;