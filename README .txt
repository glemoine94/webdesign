Pour ce projet, nous avons choisi d’utiliser les données fournies par Paris et d’ajouter des données issues d’autres sites web afin de faire un site ayant pour but de rassembler les informations sur chaque arrondissement de Paris et permettre aux nouveaux habitants de choisir au mieux l’arrondissement qui leur convient selon leurs goûts. Grâce à ses données, nous avons pu créer des graphiques à l’aide de la bibliothèque nvd3.js. De plus, nous avons réalisé une google map cliquable grâce à l’api de Google Maps représentant les délimitations des arrondissements de Paris.
Utilisation : 

Sur la page d’accueil, vous pouvez naviguer grâce au menu du header. Vous pouvez aussi cliquer sur les différentes images, les 2 premières vous dirigerons vers l’onglet quartiers, la 3ème vers la fiche du 1er arrondissement.
Sur la page quartier, il vous sera affiché une google map représentant les différents quartiers de Paris. En cliquant sur la map, vous serez dirigé vers le fichier de l’arrondissement sélectionné. Vous pouvez aussi comparer les quartiers entre eux grâce au tableau. En cliquant sur les en-têtes de colonne, vous pourrez trier votre recherche, par ordre alphabétique ou numérique. Pour chercher un quartier en particulier, tapez un nom dans la barre de recherche.
Sur les pages arrondissement, il vous sera affiché un graphique camembert et un graphique ligne donnant des informations sur le quartier sélectionné. La légende du graphique camembert est dynamique. (Pour le graphique ligne, en ordonnée se trouve la population et en abscisse les années)

Pour respecter les demandes contenues dans le sujet nous avons implémenté les fonctions : 
•	ng-model : dans l’input de recherche en page quartiers (tableau)
•	ng-show : pour choisir quel icone (une flèche vers le haut ou vers le bas) afficher lorsque nous ordonnons notre tableau. 
•	ng-repeat : dans la création de notre sous menu ou l’affichage des données de notre tableau par exemple
•	ng-click : dans les champs de tris de notre tableau, dans notre sous menu ou encore dans l’une de nos images de la page d’accueil.
ng-class  a été oublié… nous nous en sommes rendu compte trop tard en rédigeant ce read-me.

De plus, nous avons créé un service pour passer une variable d’un Controller à un autre.
Concernant le design, nous avons incorporés dans notre fichier css des paramètres modifiant la disposition et les couleurs de nos éléments afin d’obtenir une certaine harmonie de nos pages. L'utilisation d'AngularJS, bootstrap et des tag @media dans le fichier CSS nous ont permis de rendre notre site responsif et de fluidifier la transition entre différentes tailles d'écran.

Pour améliorer notre site, il faudrait augmenter le nombre d’année de données de population au début de notre graphique situé sur la page « arrondissement ». Cela permettrait d’avoir un graphe plus intéressant mais surtout plus représentatif des flux d’habitants de l’arrondissement au cours de l’histoire. Les légende d’axe sont à modifier, en effet, l’année 1872 apparait comme 1,872 par exemple. De plus le tableau en page quartier n’est pas responsive jusqu’à la largeur minimale de la page.  Enfin, nous aimerions dans le future implémenter un moteur de recherche intelligent. En fonction de critère rentré par l’utilisateur, on calculerait son quartier idéal. Il faudrait cependant beaucoup plus de données sur les arrondissements pour que le résultat soit pertinent.
