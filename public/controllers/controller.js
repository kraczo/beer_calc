var myApp = angular.module('myApp', ['ui.router']);
myApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{').endSymbol('}');
});

myApp.controller('ContactCtrl', ['$scope', '$element', '$rootScope', '$document', '$http', function($scope, $element, $rootScope, $document, $http) {

	$scope.isValid = false;
	$scope.submit = function(form) { // angular will do whatever you say in here. // default form action prevented. }
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

myApp.controller('ibuController', ['$scope', '$element', '$rootScope', '$document', '$http', function($scope, $element, $rootScope, $document, $http) {

	$scope.choices = [{
		id: 'chmielu 1',
		ibuSingeHop: 'hop0'
	}];
	var showRemove = true;
	var newItemNo = 0;
	$scope.addNewChoice = function() {

		newItemNo = $scope.choices.length + 1;
		$scope.choices.push({
			'id': 'chmielu ' + newItemNo,
			'ibuSingeHop': 'hop' + $scope.choices.length
		});
		$(".addfields").hide()
		showRemove = false;
	};

	$scope.removeChoice = function() {
		var lastItem = $scope.choices.length - 1;
		$scope.choices.splice(lastItem);
		$(".addfields").show()
		$scope.submit('#form1');
	};
	$scope.hideRetry = function() {
		if (showRemove) $(".remove").hide();
	}
//////////////////////////////////
	$http.get('public/controllers/chmiele.json')
       .then(function(res){
          $scope.options = res.data;  
          $scope.option = $scope.options[10].value;              
        });
       	// console.log($scope.options[0])
////////////////////////////////////////////
////////////////   method choice          //////////////////
$scope.methods = [
        {
          name: 'Metoda Ragera',
          value: 'Ragera'
        }, 
        {
          name: 'Metoda Tinsetha',
          value: 'Tinsetha'
        }
    ];

     $scope.methodChoice = $scope.methods[0];
////////////////////////////////////////////
	$scope.isValid = false;

	$scope.submit = function(form) { // angular will do whatever you say in here. // default form action prevented. }

		$scope.isValid = true;
		var data = {
			method: $scope.methodChoice,
			choices: $scope.choices,
			ibuController: $scope.ibuController
		};

		$http.post('/obliczamyIBU', data).then(doneCallbacks, failCallbacks);

		function doneCallbacks(res) {
			$('#response').empty();
			if (!newItemNo) newItemNo = 1;
			for (var i = 0; i < newItemNo; i++) {
				$('#ibuSingehop' + i).html(res.data.ibuSingleHop[i] + ' ibu').show().css({
					"font-size": "20px"
				});
			}
		console.log($scope.choices);
		// if($scope.choices.alfakwasy === null || $scope.choices.czasGotowania === null || $scope.choices.iloscChmielu === null){
		// 	$('.ibuSingle').hide()
		// 	$('#response').hide();
		// }
		// else
			$('#response').show().append('<span style="color:green">Suma szacowanej wartości IBU to ' + res.data.ibu + '</span>');
		}

		function failCallbacks(err) {
			console.log(err);
		}

	}

	$scope.reset = function() { // angular will do whatever you say in here. // default form action prevented. }
$scope.choices[0] = {};
		for (var i = 0; i < $scope.choices.length; i++) {
				 $scope.choices[i] = {};
			}

		$('.ibuSingle').hide()
		$('#response').hide();
	}
}])

myApp.controller('wydajnoscZacieraniaController', ['$scope', '$element', '$rootScope', '$document', '$http', function($scope, $element, $rootScope, $document, $http) {

	$scope.submit = function(form) { // angular will do whatever you say in here. // default form action prevented. }

		var data = $scope.wydajnoscZacieraniaController;

		$http.post('/wydajnoscZacierania', data).then(doneCallbacks, failCallbacks);

		function doneCallbacks(res) {
			$('#response').empty();
			$('#ciezarWlasciwy').html('ciężar właściwy '+res.data.ciezarWlasciwy).css({
					"padding": "0px"
				}).show();
			$('#response').show().append('<span style="color:green">Wydajnosc zacierania to ' + res.data.wydajnoscZacierania + ' %'+ '</span>');
			}

			function failCallbacks(err) {
			console.log(err);
			}
	}

	$scope.reset = function() { // angular will do whatever you say in here. // default form action prevented. }
		$scope.wydajnoscZacieraniaController = {};

		$('#ciezarWlasciwy').hide()
		$('#response').hide();
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