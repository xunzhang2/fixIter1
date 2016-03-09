
var express=require("express")
,app=express()
,http=require("http").createServer(app)
,bodyParser=require("body-parser")
,io=require("socket.io").listen(http)
,_=require("underscore");

/* 
  The list of participants in our chatroom.
  The format of each participant will be:
  {
    id: "sessionId",
    name: "participantName"
  }
*/
var participants = [];

app.set("hostname","127.0.0.1");
app.set("port",8080);
app.use(bodyParser.json());
app.set("views",__dirname+"/views");
app.set("view engine","jade");
app.use(express.static("public",__dirname+"/public"));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies!!!
    extended: true
}));

app.get("/",function(request,response){
	response.render("index");
});

http.listen(app.get("port"),app.get("hostname"),function(){
	console.log("Server is running. Port: "+app.get("port"));
});

app.post("/message", function(request, response) {

  //The request body expects a param named "message"
  var message = request.body.message;
  //We also expect the sender's name with the message
  var name = request.body.name;
  //If the message is empty or wasn't sent it's a bad request
  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }
  //Let our chatroom know there was a new message
  io.sockets.emit("incomingMessage", {message: message, name: name});

  //Looks good, let the client know
  response.json(200, {message: "Message received"});

});
	
io.on("connection", function(socket){

  socket.on("newUser", function(data) {
    participants.push({id: data.id, name: data.name});
    io.sockets.emit("newConnection", {participants: participants});
  });

  socket.on("nameChange", function(data) {
    _.findWhere(participants, {id: socket.id}).name = data.name;
    io.sockets.emit("nameChanged", {id: data.id, name: data.name});
  });

  socket.on("disconnect", function() {
    participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
    io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
  });

});

app.post("/login",function(request,response){
	response.render("publicchat",{username:request.body.username});
});

app.get("/changestatus",function(request,response){
	response.render("changestatus");
})

