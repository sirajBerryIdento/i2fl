// const express = require('express');
// const app = express();

// app.use(requireHTTPS);
// app.use(express.static('./dist/my-app'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/my-app/'}),
// );

// app.listen(8088, function () {
//     console.log("Application listening at http://localhost:8088")
// })


// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }

const express = require('express');
const app = express();
app.use(express.static(__dirname+'/dist/my-app'));
app.get('/*', (req, res) =>
{
    res.sendFile(__dirname+'/dist/my-app/index.html');
}
);

app.listen(8088, function () {
    console.log("Application listening at http://localhost:8088")
})