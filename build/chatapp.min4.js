var app = angular.module("ChatApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: "LoginController",
	}).when("/rooms/:roomName/", {
		templateUrl: "templates/rooms.html",
		controller: "RoomController",
	}).when("/room/:roomName", {
		templateUrl: "templates/room.html",
		controller: "RoomController",
	}).otherwise({ redirectTo: "/" });
}]);;app.factory("SocketService", ["$http", function($http) {
	var username = "";
	var socket;
	return {
		setConnected: function(theSocket) {
			socket = theSocket;
		},
		setUsername: function(user) {
			username = user;
		},
		getUsername: function() {
			return username;
		},
		getSocket: function() {
			return socket;
		}
	};
}]);;app.controller("LoginController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {
	$scope.username = "";
	$scope.message = "";
	var socket = io.connect('http://localhost:8080');

	$scope.connect = function() {

		if(socket) {
			socket.emit("adduser", $scope.username, function(available) {
				if(available) {
					//SocketService.setConnected(socket);
					//SocketService.setUsername($scope.username);
					$location.path("/rooms/lobby");
				}
				else {
					$scope.message = "Your name is taken, please choose another";
				}
				$scope.$apply();
			});
		}
	};


}]);;app.controller("RoomController", ["$scope","$location", "$routeParams", "SocketService", function($scope,$location, $routeParams, SocketService) {
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

		socket.on("roomlist", function(rooms,users) {
				$scope.rooms = rooms;
				$scope.users = users;

			
		});

		/*socket.on('rooms', function() {
		socket.emit('roomlist', rooms);*/
		


	}
	
	$scope.createChannel = function(){
	if(socket) {
	socket.emit("adduser", $scope.username, function(available) { });
	socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success) {
		 
		if(success) {
		SocketService.setConnected(socket);
		SocketService.setUsername($scope.username);
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