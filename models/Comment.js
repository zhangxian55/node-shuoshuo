//用户类
var mongoose = require("mongoose");
//Schema对象
var Schema = mongoose.Schema;

//设置schema
var commentSchema = new Schema({
    "postid" : String,  //评论哪个帖子
    "email" : String,  //谁发表的评论
    "content" : String,  //评论内容
    "date" : Date,  //发表评论的时间
    "like" : [Object]  //点赞
});

//创建类
var Comment = mongoose.model("comments",commentSchema);
//向外暴露
module.exports = Comment;