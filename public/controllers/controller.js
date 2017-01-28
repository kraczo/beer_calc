var myApp = angular.module('myApp',['ui.router']);
myApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{').endSymbol('}');
});

myApp.controller('ContactCtrl',['$scope','$element','$rootScope','$document','$http', function($scope,$element,$rootScope,$document, $http) {

 	$scope.isValid = false;
	$scope.submit = function(form){ // angular will do whatever you say in here. // default form action prevented. }
        $('#loader2').show();
		$scope.isValid = true;
		$http.post('/contactForm', $scope.ContactCtrl).then(doneCallbacks, failCallbacks);

		function doneCallbacks(res) {
		   $('#response').empty();
		   $('#loader2').hide();
		   $('#response').append('<span style="color:green">' + res.data + '</span>');
		 }

		 function failCallbacks(err) {
		  console.log(err.message);
		 }

}
}])

myApp.controller('ibuController',['$scope','$element','$rootScope','$document','$http', function($scope,$element,$rootScope,$document, $http) {
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

// $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
//   $scope.addNewChoice = function() {
//     var newItemNo = $scope.choices.length+1;
//     $scope.choices.push({'id':'choice'+newItemNo});
//   };
    
//   $scope.removeChoice = function() {
//     var lastItem = $scope.choices.length-1;
//     $scope.choices.splice(lastItem);
//   };

$scope.choices = [{id: 'chmielu 1'}];
  var showRemove = true;
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'chmielu '+ newItemNo});
    showRemove = false;
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
  $scope.hideRetry = function () {
    if(showRemove) $( ".remove" ).hide();
}

	// $http.get('/obliczIBU', function (data){
	// 	$scope.czasGotowania = data;
	// });

	// var data = {
 //        choices: $scope.choices,
 //        ibuController: $scope.ibuController
 //    };

 	$scope.isValid = false;
	$scope.submit = function(form){ // angular will do whatever you say in here. // default form action prevented. }

        $('#loader2').show();

		$scope.isValid = true;

var data = {
        choices: $scope.choices,
        ibuController: $scope.ibuController
    };

		$http.post('/obliczamyIBU', data).then(doneCallbacks, failCallbacks);
 // console.log($scope.choices);
 // console.log($scope.ibuController);
		function doneCallbacks(res) {
		   $('#response').empty();
		   $('#loader2').hide();
		   $('#response').append('<span style="color:green">' + res.data + '</span>');
		 }

		 function failCallbacks(err) {
		  console.log(err.message);
		 }

}
}])

// operacje na bazie danych

// myApp.controller('AppCtrl',['$scope','$http', function($scope, $http) {
// 	// $http.get('/c', function (req, res){
// 		console.log('Angular mowi czesc to back endu');
// 	// });
// 	// person1 = {
// 	// 	name: 'Dawid',
// 	// 	email:'dawid@kraczowski.com'
// 	// };
// 	// person2 = {
// 	// 	name: 'Dawid2',
// 	// 	email:'dawid2@kraczowski.com'
// 	// }
// 	// person3 = {
// 	// 	name: 'Dawid3',
// 	// 	email:'dawid3@kraczowski.com'
// 	// }
// 	// var list = [person1,person2,person3];
// 	// $scope.list = list;
// 	// $http.get('/').success(function (response){
// 	// 	console.log('I got the data i requested');
// 	// 	$scope.list = JSON.parse(response);
// 	// })
// 	var refresh = function () {
// 		$http.get('/c').then(doneCallbacks, failCallbacks);

// 		 function doneCallbacks(res) {
// 		   console.log('czy to dziala ???????');
// 		   $scope.list = res.data;
// 		 }

// 		 function failCallbacks(err) {
// 		  console.log(err.message);
// 		 }

// 		 $scope.contact = "";
// 	}

// 	refresh();

// 	 $scope.addContact = function () {
// 	 	$http.post('/c', $scope.contact).then(doneCallbacks, failCallbacks);

// 		 function doneCallbacks(res) {
// 		   console.log(res);
// 		   // $scope.list = res.data;
// 		 }

// 		 function failCallbacks(err) {
// 		  console.log(err.message);
// 		 }

// 		 refresh();

// 	 }

// 	 $scope.remove = function(id) {
// 	 	$http.delete('/c/' + id).then(doneCallbacks, failCallbacks);

// 	 	 function doneCallbacks(res) {
// 		   refresh();
// 		   // $scope.list = res.data;
// 		 }

// 		 function failCallbacks(err) {
// 		  console.log(err.message);
// 		 }

// 	 }

// 	 $scope.edit = function(id) {

// 	 	$http.get('/c/' + id).then(doneCallbacks, failCallbacks);

// 	 	 function doneCallbacks(res) {
// 		   // refresh();
// 		   console.log(res.data);
// 		    $scope.contact = res.data;
// 		 }

// 		 function failCallbacks(err) {
// 		  console.log(err.message);
// 		 }

// 	 }

// 	$scope.update = function() {
// 		console.log($scope.contact._id)
// 		$http.put('/c/' + $scope.contact._id, $scope.contact).then(doneCallbacks, failCallbacks);

// 		function doneCallbacks(res) {
// 		   // refresh();
// 		   console.log(res);
// 		    $scope.contact = res.data;
// 		 }

// 		 function failCallbacks(err) {
// 		  console.log(err.message);
// 		 }

// 		 refresh();
// 	}

// 	$scope.deselect = function() {
// 		 $scope.contact = "";
// 	}


// }])