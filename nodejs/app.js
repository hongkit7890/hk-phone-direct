const express = require('express')
const dayjs = require('dayjs')


const app = express()




app.set('view engine','ejs') //set view engine to ejs   
app.set('views','views') //set views folder to views
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))



let articles = [
    {title:'Article 1', author:'John'},
    {title:'Article 2', author:'Mary'},
    {title:'Article 3', author:'Peter'},
]
let now = 'Now Time: '+dayjs().format('YYYY-MM-DD HH:mm:ss') 
    

//由上以下，如上面已符合，就完
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Home', 
        now:now,
        blogs:articles
    })
}) //render index.ejs

app.get('/about',(req,res)=>{
    //res.sendFile('./views/about.html',{root:__dirname}) //__dirname is the current directory    
    res.render('about', {
        title:'ABout'
    })
})

app.get('/forms',(req,res)=>{
    res.render('forms', {
        title:'Forms',
        now:now,
        blogs:articles
        })
})

app.post('/forms',(req,res)=>{
    console.log(req.body)
    console.log(req.body.title)
    console.log(req.body.author)
    res.send('Forms')
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about')
})



// 404 page
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root:__dirname}) //__dirname is the current directory    
    res.status(404).render('404') 
})

app.use((req,res,next)=>{
    console.log('New request made')
    console.log('host: ',req.hostname)
    console.log('path: ',req.path)
    console.log('method: ',req.method)
    res.send('Hello, we got your request')
    next()
    })




app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})


