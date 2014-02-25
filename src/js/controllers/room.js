app.controller("RoomController", ["$scope","$location", "$routeParams", "SocketService", function($scope,$location, $routeParams, SocketService) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";
	$scope.rooms = [];
$scope.username = "";
	var socket = SocketService.getSocket();
	var roomId = $routeParams.id;
	//var socket2 = io.connect('http://localhost:8080');
	/*$scope.Idd = roomId;
	$scope.Names = "roomId";
	$scope.Room = {};*/
	if(socket) {
		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {

		});
		socket.on("updatechat", function(roomname, messageHistory) {
			console.log(messageHistory);
			$scope.messages = messageHistory;
			$scope.$apply();
		});

		socket.on("updateusers", function(room, users) {
			if(room === $scope.roomName) {
				$scope.users = users;
				$scope.$apply();
			}
		});

		socket.on("roomlist", function(rooms) {
				$scope.rooms = rooms;
				$scope.users = users;

			
		});

		/*socket.on('rooms', function() {
		socket.emit('roomlist', rooms);*/
		


	}
	
	$scope.createChannel = function(){
	if(socket) {

	socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success) {
		 
		if(success) {

		$scope.username = username;
		//SocketService.setConnected(socket);
		//SocketService.setUsername($scope.username);
		$location.path("/room/"+$scope.roomName);
		$scope.$apply();
		}


	});
	//$location.path("/room/"+$scope.roomname);
		}
	

	};
	$scope.leaveChannel = function(){
		//if(socket) {
//		socket.emit('partroom', { roomName: "", users: "" });
	$location.path("/rooms/lobby");
	//}
};
	$scope.Dis = function(){
		socket.emit('disconnect', function(){

		});
		$location.path("/#/");

	};
	$scope.Kick = function(){
		//todo
	};
	$scope.Ban = function(){
		//todo
	};
	$scope.send = function() {
		if(socket) {
			console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
			socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage });
			$scope.currentMessage = "";
		}
	};

	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
}]);