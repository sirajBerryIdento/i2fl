/* README: this file runs everytime we push to the i2fl repository*/
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/my-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/my-app/index.html'));
});
app.listen(process.env.PORT || 8089);


/* 
References: https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147
command: git push --set-upstream origin master
*/



