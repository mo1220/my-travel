const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const {auth} = require('../middleware/auth');

router.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})

        return res.status(200).json({
            success: true,
            payload: userInfo
        })
    }) 
})

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, userInfo) => {
        if(!userInfo) {
            return res.json({
                loginSuccess: false,
                message: '등록된 이메일이 없습니다.'
            })
        }
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) 
                return res.json({loginSuccess: false, message: '비밀번호가 틀렸습니다.'});

            userInfo.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    })

            })
        })
    })
})

router.post('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    })
})

router.get('/logout', auth, (req, res) => {
    //DB에서 유저 찾기
    User.findOneAndUpdate(
        {_id: req.user._id}, 
        {token:''},
        (err, result) => {
            if(err) return res.json({success: false, err});

            return res.status(200).json({
                success: true
            })
        })
})

module.exports = router;