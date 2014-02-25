app.controller("RoomController", ["$scope","$location", "$routeParams", "SocketService", function($scope,$location, $routeParams, SocketService) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";

	var socket = SocketService.getSocket();
	//var socket2 = io.connect('http://localhost:8080');

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
			}
		});

		socket.on("roomlist", function(rooms) {
						$scope.rooms = rooms;
			
		});
		/*socket.on('rooms', function() {
		socket.emit('roomlist', rooms);*/
	

	}
	
	$scope.createChannel = function(){
	
	$location.path("/room/create");

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