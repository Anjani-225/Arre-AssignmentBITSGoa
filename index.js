const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//API to create a message in the group (post a message in the group chat)
app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
   
    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

//API to load all the group messages in a paginated manner.
//assuming that the messages are stored in some database using socket.io the following API 
//demonstrates how pagination would be implementation
const msg = ["Hello , We've received your password change request. Please remember the new password next time when you log in. If you didn't make this change, please contact our customer support at help@companyname.com",
"Hello , your account for has been approved. You can now login with the details shared with you over email. If you are stuck anywhere, please reach out to us at ","welcome to [company name]! We've received your order successfully. To keep you updated about the delivery of your order, we'll be sending you messages via WhatsApp. If you have any queries, please contact support at [support email]. Happy to help you out.",
"These are great to reduce no-shows or keep customers informed if there is any change in their appointment timing. It will reduce support tickets & frustration on the customer side. ",
"You have an appointment scheduled with us n {{2}} at {{3}}. Please reach 10 minutes in advance to complete any formalities. We look forward to seeing you there. ",
"Your app broke down? Or there was a glitch in your software? Use these issue resolution templates to inform customers when issues are resolved or keep them calm that their accounts haven't been affected. "];

app.get('/getMessages',paginatedResults(),function(req, res) {
    es.json(res.paginatedResults);
});

function paginatedResults() {
    return async (req, res, next) => {
      
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skipIndex = (page - 1) * limit;
      const results = {};
  
      try {
        results.results = await msg.find()
          .sort({ _id: 1 })
          .limit(limit)
          .skip(skipIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } catch (e) {
        res.status(500).json({ message: "Error Occured" });
      }
    };
}


const server = http.listen(3000, function() {
    console.log('listening on *:3000');
});