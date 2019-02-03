var express = require('express');
var router = express.Router();
const chatkit = require('./chatkit');

router.post('/',(req,res)=>{
    const userId = req.query.user_id;

    // chatkit.createUser({
    //     id: userId,
    //     name: userId
    // })
    //     .then(()=>{
    //         const authData = chatkit.authenticate({
    //             userId: userId
    //         });
            
    //         res.status(authData.status)
    //             .send(authData.body);
    //     })
    //     .catch((err)=>{
    //         console.log('createUser error')
    //         console.log(err);
    //     });

    //[MUST] 이미 가입되어있는데 다시 만들어서 수정
    chatkit.createUser({
        id: userId,
        name: userId
    })
        .catch(() => {})
        .then(() => {
            const authData = chatkit.authenticate({
                userId: userId
            });

            res.status(authData.status)
                .send(authData.body);
        });
        
})

module.exports = router;