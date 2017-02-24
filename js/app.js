/*Ceci est notre module angular "app", nous lui avons défini :
-un service AngularJS nous permettant de partager du code dans tous nos controller
-4 controllers
- une config dirigeant les chemins de navigation
*/


var app = angular.module('store', ['ngRoute', 'nvd3ChartDirectives']);
// on ajoute une dépendance ngRoute pour le cheminement de page et nvd3ChartDirectives pour la réalisation de graphique

//service permettant le partage de la variable code postale entre les différents controllers
app.service('sharedProperties', function () {
	var property = '75101';
	return {
		getProperty: function () { // récupérer la valeur
			return property;
		},
		setProperty: function (value) { // modifier la valeur
			property = value;
		}
	};
});

// permet de créer les liens entre les pages
app.config([
	'$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'partials/home.html',
				controller: 'storeController',
				controller: 'navController'
			})
			.when('/quartiers', {
				templateUrl: 'partials/quartiers.html',
				controller: 'tableController'
				
			})
			.when('/arrondissement', {
				templateUrl: 'partials/arrondissement.html',
				controller: 'storeController',
				controller: 'navController',
			})

			.otherwise({
				redirectTo: '/home' //chemin par defaut
			})

	}
]);

//controller permetant de générer la google map
app.controller('mapController', [
	'$http', '$scope', 'sharedProperties',
	function ($http, $scope, sharedProperties) {
        // options prédéfinies de la map 
		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(48.86, 2.34),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		//création de la map avec les option et les donénes récupées dans le fichier geojson
		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		console.log("map loading");

		// on récupère les informations du fichier geojson pour créer les polygones représentant les quartiers
		$scope.map.data.loadGeoJson('arrondissements.geojson');

		// On redirige l'utilisateur sur le bon quartier en fonction du click sur la map
		$scope.map.data.addListener('click', function (event) {
			console.log(event.feature.f.c_arinsee);
			sharedProperties.setProperty(event.feature.f.c_arinsee); // on récupère la variable code postale dans le service
			window.location.href = ('#/arrondissement')//on renvoit sur la page autre

		});
		//On ajoute un effet de couleur au survol des polygones de la carte
		$scope.map.data.addListener('mouseover', function (event) {
			event.feature.setProperty('isColorful', true);
		});
		//On annules l'effet de couleur lorsque la souris quitte un polygone de la carte
		$scope.map.data.addListener('mouseout', function (event) {
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
				strokeColor: color, //couleur de la bordure
				strokeWeight: 2 //taille de la bordure
			});
		});

	}
]);

//controller générant les graphiques des pages arrondissements (réalisés avec les librairies nvd3 )
app.controller('storeController', [
	'$http', '$scope', 'sharedProperties',
	function ($http, $scope, sharedProperties) {

		$http.get('commerces.json').success(function (data) { //récupération des données du fichier json
			console.log("succes");
			angular.forEach(data, function (value, key) { //boucle sur les données du fichier
				if (value.fields.departement_commune == sharedProperties.getProperty()) { //si la valeur du code postale récupéré après click est la même que celle de l'objet du fichier json
					$scope.exampleData = [ // création du tableau de données du quartier sélectionné
						{ key: "supermarche", y: value.fields.supermarche }, //on récupère le nombre total de supermarchés de l'arrondissement
						{ key: "Hypermarche", y: value.fields.hypermarche },
						{ key: "poissonnerie", y: value.fields.poissonnerie },
						{ key: "superette", y: value.fields.superette },
						{ key: "boulangerie", y: value.fields.boulangerie },
						{ key: "epicerie", y: value.fields.epicerie },
						{ key: "boucherie", y: value.fields.boucherie_charcuterie }
					];
					$scope.titre = value.fields.libelle_de_commune; // on récupère le nom de l'arrondissement pour l'afficher sur la page en tant que titre

				}
			});
		}).catch(function (err) { // récupération d'erreur
			console.log(err);
		});
		// modification des couleurs du graphique 
		var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
		$scope.colorFunction = function () {
			return function (d, i) {
				return colorArray[i];
			};
		}
		// récupération des données du champ x ( nom des commerces)
		$scope.xFunction = function () {
			return function (d) {
				return d.key;
			};
		}
		// récupération des données du champ y ( nombre de commerce)
		$scope.yFunction = function () {
			return function (d) {
				return d.y;
			};
		}
		// récupération des données de population du fichier json
		$http.get('population.json').success(function (data) {
			
			//création d'un tableau vide
			var listed = [];
			listed.push(data[sharedProperties.getProperty() - 75101]); // on récupère l'objet voulu suivant le numero de code postale. ex : pour le Cdp 75101 on récupère tab[0]
			//console.log(listed);
			$scope.Data = listed; //récupération du tableau de données
		}).catch(function (err) {
			console.log(err);
		});
		// récupération de la source de l'image en fonction du code postal sélectionné
		$scope.image = "image/" + (sharedProperties.getProperty()) + ".jpg";



	}


]);


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


//controller permettant la création et la navigation dans le sous-menu
app.controller('navController', [
	'$http', '$scope', '$route', '$location', 'sharedProperties',
	function ($http, $scope, $route, $location, sharedProperties) {
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


