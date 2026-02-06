TP API et Web Service - Bintou DIALLO

1. Objectif du projet :

Dans le cadre de notre matière d'API et Web Service, nous avons dû créer une API REST, imitant le fonctionnement d'un site comme Facebook.

L’API doit permettre :

- la gestion des utilisateurs,

- la création et la gestion de groupes,

- l’organisation d’événements,

- les discussions via des messages,

- la gestion d’albums photo,

- la création de sondages,

- la mise en place d’une billetterie pour certains événements.

L’ensemble du projet doit respecter les besoins fonctionnels fournis dans l’énoncé, tout en restant cohérent avec l’intention générale du fonctionnement de Facebook.


2. Respect des besoins fonctionnels :

L’ensemble des fonctionnalités demandées dans l’énoncé a été implémenté.

Les relations entre les différentes entités ont été respectées :

- un utilisateur peut créer ou faire partie d'un des groupes,

- un groupe peut contenir des événements,

- un événement peut contenir des discussions, des albums photo, des sondages et une billetterie,


Lorsque certains points de l’énoncé n’étaient pas entièrement détaillés, des choix ont été faits en restant cohérent avec le fonctionnement attendu d’un réseau social de ce type.


3. Sécurité et validation des données :

L’API est sécurisée grâce à :

- une authentification basée sur des JSON Web Tokens (JWT),

- un middleware requireAuth protégeant les routes sensibles,

- une vérification systématique des identifiants MongoDB (ObjectId),

- des validations au niveau des schémas Mongoose pour garantir l’intégrité des données (champs requis, types, contraintes).

Les schémas d’entrée des données sont ainsi sécurisés afin d’éviter les incohérences et les erreurs de saisie.


4. Organisation des collections :

Des collections distinctes ont été créées pour chaque type de données, conformément aux spécifications :

- Users

- Groups

- Events

- Threads

- Messages

- Albums

- Polls

- Tickets (types de billets et billets achetés)

Cette séparation a permis une meilleure lisibilité du projet et une gestion claire des relations entre les différentes entités.


5. Fonctionnalités principales de l’API :

- Authentification

- Inscription d’un utilisateur

- Connexion avec génération d’un token JWT

- Groupes

- Création de groupes publics

- Consultation des groupes publics

- Gestion des membres et administrateurs

- Événements

- Création d’événements au sein d’un groupe

- Distinction entre événements publics et privés

- Discussions

- Création de messages dans un groupe ou un événement

- Consultation des messages associés

- Albums photo

- Création d’un album photo associé à un événement

- Possibilité pour les participants de publier et commenter des photos

- Sondages

- Création de sondages par un organisateur

- Un sondage peut contenir plusieurs questions

- Une seule réponse possible par question et par participant

- Billetterie


6. Documentation de l’API :

Les routes de l’API ont été testées et documentées à l’aide de Postman.
Chaque fonctionnalité principale dispose de routes clairement définies, permettant de tester l’ensemble du comportement de l’API.

(Cf. Document recensant les différentes captures d'écran des tests réalisés sur Postman, mis dans le dossier du projet)


7. Technologies utilisées :

- Node.js

- Express.js

- MongoDB

- Mongoose

- JSON Web Token (JWT)

8. Endpoints :

- Authentification :

POST
/auth/register
Permet de créer un nouvel utilisateur.

POST
/auth/login
Permet à un utilisateur de se connecter et de récupérer un token JWT.

- Utilisateurs :

GET
/users
Permet de récupérer la liste des utilisateurs.

GET
/users/:userId
Permet de récupérer les informations d’un utilisateur précis.

-Groupes :

POST
/groups
Permet de créer un groupe.

GET
/groups
Permet de récupérer la liste des groupes publics.

GET
/groups/:groupId
Permet de récupérer les informations d’un groupe.

- Événements :

POST
/groups/:groupId/events
Permet de créer un événement à l’intérieur d’un groupe.

GET
/events/:eventId
Permet de récupérer les informations d’un événement.

- Discussions / Messages :

POST
/threads/groups/:groupId/threads
Permet de poster un message dans un groupe.

POST
/threads/events/:eventId/threads
Permet de poster un message dans un événement.

GET
/threads/groups/:groupId
Permet de récupérer les messages d’un groupe.

GET
/threads/events/:eventId
Permet de récupérer les messages d’un événement.

- Albums photo :

POST
/albums/events/:eventId
Permet de créer un album photo lié à un événement.

GET
/albums/events/:eventId
Permet de récupérer les albums photo d’un événement.

- Sondages :

POST
/polls/events/:eventId
Permet de créer un sondage pour un événement.

GET
/polls/events/:eventId
Permet de récupérer les sondages d’un événement.

- Billetterie :

POST
/tickets/events/:eventId/types
Permet de créer un type de billet pour un événement public.

GET
/tickets/events/:eventId/types
Permet de récupérer les types de billets d’un événement.

POST
/tickets/:ticketTypeId/buy
Permet à une personne d’acheter un billet.

- Sécurité :

Les routes sensibles sont protégées par une authentification JWT.
Un token valide est requis pour accéder aux fonctionnalités de création et de modification.

8. Conclusion :

Ce projet répond aux exigences de l’énoncé en respectant les besoins fonctionnels demandés.
Les choix réalisés permettent d’obtenir une API cohérente, sécurisée et extensible, tout en restant fidèle à l’esprit d’un réseau social de type Facebook.