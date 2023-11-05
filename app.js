const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const flash = require('express-flash');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', hbs.engine({ extname: 'hbs'}));
app.use(express.static(__dirname + '/assets'));
app.use(express.urlencoded({extended: true}))
app.use(flash())




app.use(function (req, res, next){
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}))

app.listen(3000, ()=>{
    console.log("server is running on 3000...");
});

function checkSignIn(req, res, next){
    if (req.session.isAuth) {
        next()
    }else{
        res.redirect('/')
    }
}

app.get('/', (req,res)=>{
    if (req.session.isAuth) {
        res.redirect('./home')
    }else{
        res.render('./login');
    }
})

app.get('/home', checkSignIn, (req, res) =>{
    res.render('./home', {
        card: [
            {
                title: 'Card',
                url: 'https://images.unsplash.com/photo-1682686580186-b55d2a91053c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2575&q=80'
            },
            {
                title: 'Card2',
                url: 'https://images.unsplash.com/photo-1682686580036-b5e25932ce9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
            },
            {
                title: 'Card3',
                url: 'https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
            },
            {
                title: 'Card4',
                url: 'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60'
            },
            {
                title: 'Card5',
                url: 'https://images.unsplash.com/photo-1682685797140-c17807f8f217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60'
            }
        ]
    });
})

app.get('/logout', (req, res) =>{
    // const username = req.session.isAuth ? 'sree' : 'Unknown User'; 
    req.session.destroy()
    // console.log(`User ${username} has logged out.`);
    res.redirect('/')

})
    


app.post('/login', (req, res) =>{
    const { username, password} = req.body

    if (username === 'sree') {
        if (password === '123') {
            req.session.isAuth = true;
            res.redirect('/home');
        }else{
            req.flash('error', 'Incorrect password..')
            res.redirect('/')
        }
    }else{
        req.flash('error', 'Incorrect username, Enter a valid username')
        res.redirect('/')
    }
})






