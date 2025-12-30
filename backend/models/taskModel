const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { tpye: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false }
}, { timestampes: true});

module.exports = mongoose.model('Task', taskSchema);


// user: { 
//     type: mongoose.Schema.Types.ObjectId, // 类型：不是字符串，是 ID
//     required: true,                       // 必填：任务必须有人认领
//     ref: 'User'                           // 关联：指向 'User' 模具
// },

// type: ...ObjectId: MongoDB 里的每条数据都有一个独一无二的身份证号，叫 _id。这一行是说：这个 user 字段存的不是“张三”这个名字，而是张三在 User 表里的那个身份证号（比如 64f8a... 这种乱码）。

// ref: 'User' (重点): 这是 Reference (引用) 的缩写。 它告诉 Mongoose：“嘿，这个 ID 是属于 User 这个模型的。” 它的作用： 以后你想查这个任务是谁写的，你可以让 Mongoose 顺着这个 ID 去 User 表里把这个人的详细信息（名字、邮箱）抓过来（这个动作叫 populate）。

// required: true: 这意味着创建任务时，必须指定主人。没有主人的任务是不允许存入数据库的。