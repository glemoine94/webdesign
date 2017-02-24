Pour ce projet, nous avons choisi d�utiliser les donn�es fournies par Paris et d�ajouter des donn�es issues d�autres sites web afin de faire un site ayant pour but de rassembler les informations sur chaque arrondissement de Paris et permettre aux nouveaux habitants de choisir au mieux l�arrondissement qui leur convient selon leurs go�ts. Gr�ce � ses donn�es, nous avons pu cr�er des graphiques � l�aide de la biblioth�que nvd3.js. De plus, nous avons r�alis� une google map cliquable gr�ce � l�api de Google Maps repr�sentant les d�limitations des arrondissements de Paris.
Utilisation : 

Sur la page d�accueil, vous pouvez naviguer gr�ce au menu du header. Vous pouvez aussi cliquer sur les diff�rentes images, les 2 premi�res vous dirigerons vers l�onglet quartiers, la 3�me vers la fiche du 1er arrondissement.
Sur la page quartier, il vous sera affich� une google map repr�sentant les diff�rents quartiers de Paris. En cliquant sur la map, vous serez dirig� vers le fichier de l�arrondissement s�lectionn�. Vous pouvez aussi comparer les quartiers entre eux gr�ce au tableau. En cliquant sur les en-t�tes de colonne, vous pourrez trier votre recherche, par ordre alphab�tique ou num�rique. Pour chercher un quartier en particulier, tapez un nom dans la barre de recherche.
Sur les pages arrondissement, il vous sera affich� un graphique camembert et un graphique ligne donnant des informations sur le quartier s�lectionn�. La l�gende du graphique camembert est dynamique. (Pour le graphique ligne, en ordonn�e se trouve la population et en abscisse les ann�es)

Pour respecter les demandes contenues dans le sujet nous avons impl�ment� les fonctions : 
�	ng-model : dans l�input de recherche en page quartiers (tableau)
�	ng-show : pour choisir quel icone (une fl�che vers le haut ou vers le bas) afficher lorsque nous ordonnons notre tableau. 
�	ng-repeat : dans la cr�ation de notre sous menu ou l�affichage des donn�es de notre tableau par exemple
�	ng-click : dans les champs de tris de notre tableau, dans notre sous menu ou encore dans l�une de nos images de la page d�accueil.
ng-class  a �t� oubli� nous nous en sommes rendu compte trop tard en r�digeant ce read-me.

De plus, nous avons cr�� un service pour passer une variable d�un Controller � un autre.
Concernant le design, nous avons incorpor�s dans notre fichier css des param�tres modifiant la disposition et les couleurs de nos �l�ments afin d�obtenir une certaine harmonie de nos pages. L'utilisation d'AngularJS, bootstrap et des tag @media dans le fichier CSS nous ont permis de rendre notre site responsif et de fluidifier la transition entre diff�rentes tailles d'�cran.

Pour am�liorer notre site, il faudrait augmenter le nombre d�ann�e de donn�es de population au d�but de notre graphique situ� sur la page � arrondissement �. Cela permettrait d�avoir un graphe plus int�ressant mais surtout plus repr�sentatif des flux d�habitants de l�arrondissement au cours de l�histoire. Les l�gende d�axe sont � modifier, en effet, l�ann�e 1872 apparait comme 1,872 par exemple. De plus le tableau en page quartier n�est pas responsive jusqu�� la largeur minimale de la page.  Enfin, nous aimerions dans le future impl�menter un moteur de recherche intelligent. En fonction de crit�re rentr� par l�utilisateur, on calculerait son quartier id�al. Il faudrait cependant beaucoup plus de donn�es sur les arrondissements pour que le r�sultat soit pertinent.
