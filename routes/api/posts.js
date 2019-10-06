const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePost = require('../../validation/post');
//get all posts
//access public
//get api/posts
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => {
            let errors = {};
            if (typeof posts === 'object' && Object.keys(posts).length === 0) {
                errors.noPosts = 'there is no posts';
                res.status(404).json(errors)
            }
            res.json(posts);
        })
    // .catch(err => res.status(404).json({noPosts: 'there is no posts'}));
});
//get a single posts
//access public
//get api/posts/:post_id
router.get('/:post_id', (req, res) => {
    Post.findOne({_id: req.params.post_id})
        .then(post => {
            res.json(post);
        }).catch(err => res.status(404).json({noPostFound: 'no posts found with that id'}));
});
//create a posts
//access private
//posts api/posts/
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePost(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        date: req.body.date,
        user: req.user.id
    };
    new Post(newPost).save().then(post => res.json(post));
    // Post.findOne({user: req.user.id})
    //     .then(posts => {
    //         if (!posts) {
    //             new Post(newPost).save().then(posts => res.json(posts));
    //         }
    //         else{
    //             Post.findOneAndUpdate({user: req.user.id}, {$set:newPost},{new: true})
    //                 .then(posts => res.json(posts));
    //         }
    //     })
});
//delete a posts
//access private
//delete api/posts/:post_id
router.delete('/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
                if (!post) {
                    return res.status(404).json({noPost: 'there is no posts with that id'})
                }
                else {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({success: false})
                    }
                    post.remove().then(() => res.json({success: true}));
                }
            }
        )
        .catch(err => {
            res.json({wrongId: 'this id is wrong'})
        });
});
//like a posts
//access private
//posts api/posts/like/:post_id
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
                if (!post) {
                    return res.status(404).json({noPost: 'there is no posts with that id'})
                }
                else {
                    if (post.like.filter(item => item.user.toString() === req.user.id)
                        .length > 0) {
                        res.status(400).json({liked: 'you already liked this posts'});
                    }
                    else {
                        post.like.unshift({user: req.user.id});
                        post.save().then(post => res.json(post));
                    }
                    // const likeOrDislike = posts.like.map(item => item.user).toString().indexOf(req.user.id);
                    // if (likeOrDislike === -1) {
                    //     posts.like.unshift({user: req.user.id});
                    //     posts.save().then(posts => res.json(posts));
                    // }
                    // else {
                    //     posts.like.splice(likeOrDislike, 1);
                    //     posts.save().then(posts => res.json(posts));
                    // }
                }
            }
        )
        .catch(err => {
            if (err.name === 'CastError') {
                res.json({wrongId: 'this id is wrong'})
            }
            else {
                console.log(err);
            }
        });
});
//unlike a posts
//access private
//posts api/posts/unlike/:post_id
router.post('/unlike/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
                if (!post) {
                    return res.status(404).json({noPost: 'there is no posts with that id'})
                }
                else {
                    if (post.like.filter(item => item.user.toString() === req.user.id)
                        .length > 0) {
                        const likeOrDislike = post.like.map(item => item.user).toString().indexOf(req.user.id);
                        post.like.splice(likeOrDislike, 1);
                        post.save().then(post => res.json(post));
                    }
                    else {
                        res.status(400).json({unliked: 'you already unliked this posts'})
                    }
                }
            }
        )
        .catch(err => {
            if (err.name === 'CastError') {
                res.json({wrongId: 'this id is wrong'})
            }
            else {
                console.log(err);
            }
        });
});
//comment on a posts
//access private
//posts api/posts/comment/:post_id
router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
                if (!post) {
                    return res.status(404).json({noPost: 'there is no posts with that id'})
                }
                else {
                    const newComment = {
                        text: req.body.text,
                        name: req.body.name,
                        avatar: req.body.avatar,
                        date: req.body.date,
                        user: req.user.id
                    };
                    post.comment.unshift(newComment);
                    post.save().then(post => res.json(post));
                }
            }
        )
        .catch(err => {
            if (err.name === 'CastError') {
                res.json({wrongId: 'this id is wrong'})
            }
            else {
                console.log(err);
            }
        });
});
//uncomment on a posts
//access private
//posts api/posts/uncomment/:post_id/:comment_id
router.post('/uncomment/:post_id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
            if (!post) {
                return res.status(404).json({noPost: 'there is no posts with that id'})
            }
            else {
                let errors = {};
                const deletedComment = post.comment.map(item => item.id).indexOf(req.params.comment_id);
                if (deletedComment !== -1) {
                    const selectedComment = post.comment.filter(item => item.user.toString() === req.user.id);
                    if (selectedComment[0].user.toString() === req.user.id) {
                        post.comment.splice(deletedComment, 1);
                        post.save().then(post => res.json(post));
                    }
                    else {
                        errors.haveNoComment = `you don't have right to delete this comment`;
                        res.status(400).json({errors})
                    }
                }
                else {
                    errors.noComment = `there is no comment with that id to delete`;
                    res.status(404).json({errors})
                }
            }
        })
        .catch(err => {
            if (err.name === 'CastError') {
                res.json({wrongId: 'this id is wrong'})
            }
            else {
                console.log(err);
            }
        });
})
;
module.exports = router;