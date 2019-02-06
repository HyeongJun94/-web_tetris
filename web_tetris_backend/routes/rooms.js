var express = require('express');
var router = express.Router();

// username : username,
//   data: roomId: roomId

router.get('/:roomId',(req,res)=>{
    console.log(`Hello ${req.params.roomId}`)
})

router.post('/:roomId',(req,res)=>{
    const userId = req.body.roomId;
    const username = req.body.username

    console.log(`Enter Room ${username} in ID:${userId}`)
    // res.send(userId)    
    
    res.send('enter room')

})

module.exports = router;