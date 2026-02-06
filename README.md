###Afin de tester l'API : 

Je vous fournis avec ce projet un lien vers une collection Postman permettant de teste mon API : https://documenter.getpostman.com/view/49072499/2sBXc8pPE6

Cette collection Postman regroupe l’ensemble des endpoints de l’API et permet de tester rapidement toutes les fonctionnalités implémentées (authentification, utilisateurs, groupes, événements, albums photo, sondages et billetterie).

Elle a pour but de faciliter la compréhension du fonctionnement de l’API et de permettre à un autre développeur (ou à l’enseignant) d’importer directement les requêtes dans Postman afin de tester l’API sans configuration complexe.

Il suffit d’importer la collection dans Postman, de lancer l’API en local, puis d’exécuter les requêtes pour vérifier le bon fonctionnement de chaque endpoint.

###Afin d'installer l'API : 

- Cloner le dépôt GitHub avec la commande suivante :

git clone https://github.com/bintoudscolaire/projet_api_web_service.git


- Puis se placer dans le dossier du projet :

cd projet_api_web_service

##Prérequis

Les éléments suivants sont nécessaires pour faire fonctionner le projet :

Node.js
Version utilisée : v18.20.8


npm
Version utilisée : 10.8.2


MongoDB
- Une instance MongoDB doit être lancée en local.

Postman
- Utilisé pour tester et documenter les endpoints de l’API.

##Installation des dépendances

#Installer les dépendances du projet avec la commande suivante :

npm install

##Configuration de l’environnement

- Un fichier .env doit être créé à la racine du projet avec le contenu suivant :

PORT=3000
MONGODB_URI=mongodb://localhost:27017/api-tp-secure
JWT_SECRET=unSecretDeVotreChoix123!!!
JWT_EXPIRATION=2h


Ce fichier n’est pas versionné pour des raisons de sécurité.


###Lancement de l’API

- Pour lancer l’API en mode développement :

npm run dev


- Si tout fonctionne correctement :

la connexion à MongoDB est affichée dans le terminal,

le serveur écoute sur le port 3000.

- L’API est accessible à l’adresse suivante :

http://localhost:3000

##Dépendances principales

Les principales dépendances utilisées sont :

- express

- mongoose

- jsonwebtoken

- bcrypt

- dotenv

- cors

- helmet

- compression

Les versions exactes sont précisées dans le fichier package.json.

