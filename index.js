const express = require('express')
const app = express()
const port = 3000
const {User} = require('./models/User');

//데이터 분석해서 가져올 수 있도록 하는 코드
//이걸로 아래의 req.body가져오게해준다.
app.use(express.urlencoded({extended: true}));

app.use(express.json())


const mongoose = require('mongoose')
mongoose.connect('몽고db 주소 복사 후 붙여넣기', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', (req, res)=>{

    //회원가입시 필요한 정보들을 client에서 가져오면 
    //그것을 데이터베이스에 넣어줌.
    //전에 만든 유저모델을 가져오기.

    const user = new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})

    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})