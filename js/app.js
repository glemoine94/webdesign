


var app = angular.module('store', ['ngRoute', 'nvd3ChartDirectives']);
// on ajoute une dépendance ngRoute pour le cheminement de page et nvd3ChartDirectives pour la réalisation de graphique


app.service('sharedProperties', function () {
	var property = '75101';
	return {
		getProperty: function () {
			return property;
		},
		setProperty: function (value) {
			property = value;
		}
	};
});

app.config([
	'$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'partials/home.html',
				controller: 'storeController',
				controller:'navController'
			})
			.when('/quartiers', {
				templateUrl: 'partials/quartiers.html',
				controller: 'tableController'
			})
			.when('/arrondissement', {
				templateUrl: 'partials/arrondissement.html',
				controller: 'storeController',
				controller:'navController',
				//controller:'chartController'
			})
			
			.otherwise({
				redirectTo: '/home' //par defaut
			})

	}
]);


app.controller('mapController', [
	'$http', '$scope','sharedProperties',
	function ($http, $scope,sharedProperties) {

		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(48.86, 2.34),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		console.log("map loading");

		// on récupère les informations du fichier geojson pour créer les polygones représentant les quartiers
		$scope.map.data.loadGeoJson('arrondissements.geojson');

		// On redirige l'utilisateur sur le bon quartier en fonction du click sur la map
		$scope.map.data.addListener('click', function (event) {
			//event.feature.setProperty('isColorful', true);
			console.log(event.feature.f.c_arinsee);
			//window.location.href = ('#/' + event.feature.f.c_ar + 'arrondissement')
			sharedProperties.setProperty(event.feature.f.c_arinsee); // on récupère la variable code postale dans le service
			window.location.href = ('#/arrondissement')
			//$location.path("arrondissement"); // on revoit sur la page autre

		});
		//On ajoute un effet de couleur au survol des polygones de la carte
		$scope.map.data.addListener('mouseover', function (event) {
			//alert('over');
			event.feature.setProperty('isColorful', true);
		});
		//On annules l'effet de couleur lorsque la souris quitte un polygone de la carte
		$scope.map.data.addListener('mouseout', function (event) {
			//alert('over');
			event.feature.setProperty('isColorful', false);
		});

		//fonction qui color les polygones en gris quand la variable isColorful est vrais
		$scope.map.data.setStyle(function (feature) {
			var color = '#1067AB';
			if (feature.getProperty('isColorful')) {
				color = feature.getProperty('color');
			}
			return ({
				fillColor: color,
				strokeColor: color,
				strokeWeight: 2 //taille de la bordure
			});
		});

	}
]);

app.controller('storeController', [
	'$http', '$scope', 'sharedProperties',
	function ($http, $scope, sharedProperties) {

		$http.get('commerces.json').success(function (data) {
			console.log("succes");
				angular.forEach(data, function (value, key) {
					if (value.fields.departement_commune == sharedProperties.getProperty()) {
						$scope.exampleData = [
							{ key: "supermarche", y: value.fields.supermarche },
							{ key: "Hypermarche", y: value.fields.hypermarche },
							{ key: "poissonnerie", y: value.fields.poissonnerie },
							{ key: "superette", y: value.fields.superette },
							{ key: "boulangerie", y: value.fields.boulangerie },
							{ key: "epicerie", y: value.fields.epicerie },
							{ key: "boucherie", y: value.fields.boucherie_charcuterie }
						];
						$scope.titre =  value.fields.libelle_de_commune;
					
					}
				});
		}).catch(function (err) {
			console.log(err);
		});

				 $http.get('test.json').success(function (data) {
						
						var degueux = [];
						degueux.push(data[0]);
						console.log(degueux);
						$scope.Data = degueux;
				}).catch(function (err) {
					console.log(err);
				});

			$scope.image = "image/" + (sharedProperties.getProperty()) + ".jpg";

		var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
		$scope.colorFunction = function () {
			return function (d, i) {
				return colorArray[i];
			};
		}

		$scope.xFunction = function () {
			return function (d) {
				return d.key;
			};
		}

		$scope.yFunction = function () {
			return function (d) {
				return d.y;
			};
		}

	}


]);
/*app.controller('chartController', [
	'$http', '$scope', 'sharedProperties',
	function ($http, $scope, sharedProperties) {
	 //var store = this;
		//this.products = [];

		//sharedProperties.getProperty  == code postal de l'arrondissement
		$http.get('test.json').success(function (data) {

			//$scope.findValue = function () {
				angular.forEach(data, function (value, key) {
					if (value.arr == sharedProperties.getProperty()) {
						$scope.Datas = [{
							"key" : "Series 1",
							"values": value.Values} 
						];
					}
				});
		}).catch(function (err) {
			console.log(err);
		});
		

	}
]);*/

//controller permettant la création d'un tableau
app.controller('tableController', [
	'$http', '$scope',
	function ($http, $scope) {
		$scope.sortType = 'fields.libelle_de_commune'; // fixe le typer de tri par default
		$scope.sortReverse = false;  // fix l'ordre de tri par defaut
		$scope.searchService = '';     // fix le terme de recherche par default

		//On récupère le données du json 
		$scope.service = [];
		$http.get('services.json').success(function (data) {
			console.log("success!");
			$scope.service = data;
			console.log(data.service);
		});

	}]);



app.controller('navController', [
	'$http', '$scope','$route', '$location', 'sharedProperties',
	function ($http, $scope,$route, $location, sharedProperties) {
		$http.get('liste.json').success(function (data) { // on récupère la liste de nos arrondissements et Cdp
			$scope.listeArr = data.listeArr;
		});
		$scope.log = function (Arrondissement) {
			sharedProperties.setProperty(Arrondissement.postalCode); // on récupère la variable code postale
			$route.reload();
			$location.path("arrondissement"); // on renvoit sur la page arrondissement
			$route.reload();

		};
	}]);


