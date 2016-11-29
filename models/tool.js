var Post = require("./Post.js");
var User = require("./User.js");
var Comment = require("./Comment.js");


//发言。发言是两个model的事情，User、Post
exports.fayan = function(email,content,callback){
    //要更改两个表的东西posts、users
    var p = new Post({
        "email" : email,
        "content" : content,
        "date" : new Date()
    });

    p.save(function(err){
        if(err){
            callback("-1");
            return;
        }
        //更改用户的posts属性
        User.find({"email":email},function(err,results){
            results[0].posts.push(p._id);
            results[0].save(function(err){
                if(err){
                    callback("-1");
                    return;
                }
                callback("1");
            });
        });
    });
}


//发评论。发言是三个model的事情，Post、Comment、User
exports.fapinglun = function(email,postid,content,callback) {
    console.log(email,postid,content);
    //创建一个新的评论对象
    var n = new Comment({
        "postid" : postid,  //评论哪个帖子
        "email" : email,  //谁发表的评论
        "content" : content,  //评论内容
        "date" : new Date()  //评论时间
    });

    n.save(function(err){
        if(err){
            callback("-1");
            return;
        }
        //让Post去持久这个评论编号
        Post.find({"_id":postid},function(err,posts){
            if(err){
                callback("-1");
                return;
            }
            posts[0].comments.push(n._id);
            posts[0].save(function(err){
                //让User去持久这个评论编号
                User.find({"email":email},function(err,users){

                    if(err){
                        callback("-1");
                        return;
                    }
                    users[0].comments.push(n._id);
                    users[0].save(function(err){
                        if(err){
                            callback("-1");
                            return;
                        }
                        callback("1");
                    });
                });
            });
        });
    });
}

