# heroku

il est possible de faire la mise en prod complétement depuis l'interface graphique ou depuis la CLI. Ici c'est un mix.

## prérequis

- créer un compte [Heroku](https://signup.heroku.com/login).
- installer le CLI si ce n'est pas déjà le cas <https://devcenter.heroku.com/articles/heroku-cli#download-and-install>.
- ensuite on se connecte

## création de l'app

```bash
heroku login
```

- j'appuie sur une touche par exemple `entrez`
- je me log in sur la page qui s'est ouverte dans le navigateur
- création d'une app depuis le GUI
- connection à son **[dashboard](https://dashboard.heroku.com/apps)**.
- c'est en haut à droite `New -> Create New App`
- on choisit europe enfin si l'app est en tout cas destiné à un public européen
  
### Méthode de déploiement

le but maintenant est d'ajouter un remote. Cela va créer un lien entre héroku et git

- Ensuite on se place à la racine du projet (au mème endroit que là ou l'on a effectué le git init)

-

```bash
# On ajoute le remote
heroku git:remote -a le-nom-de-votre-app

# On peut voir le nouveau remote
git remote -v
```

### Le buidpack

- onglet `settings` et on scroll jusqu'à `Buildpack`.
- On clique sur `Add Buildpack` et on sélectionne celui qui nous intéresse.

#### Buildpack NodeJs

Ce buildpack requiert que les dépendances soit toutes installables via
`npm install` et que l'application démarre via `npm start`.

- directement dans l'interface onglet : `settings` => `add builpack` => `node.js`

### La base de donnée

Dans l'univers d'Heroku on parle "**d'extensions**".

- directement dans l'interface onglet : `ressources` => `add-ons` => `heroku postgres` => `install heroku postgres`
- on peut choisir le plan adapté, des petits sites peuvent rester sur le gratuit
- ensuite dessous rentrer le nom de mon application
- je valide => `submit order`
- la bdd est créée

#### Connection

-
- Pour retrouver les informations sur notre bdd direction l'onglet `Ressources` et je clique sur mon add on déjà créer.
- on clique sur celui déjà créer exemple heroku postgres => `Settings` et la section`Database Credentials` => `view credentials`

- ici c'est la chaîne de connection qui nous intéresse `URI`

#### fichier de connection dans le code

- exemple `db.js`
  
```js
// IMPORTATION DE PG

const {Pool} = require("pg");

// CREATION NEW CLIENT
const client = new Pool (
  {
    connectionString: process.env.DATABASE_URL
    // ssl:{ rejectUnauthorized: false } // On accepte de se passer de SSL
  } // le SSL est indispensable pour la connexion avec Heroku (Secure Sockets Layer, protocole de sécurisation des échanges sur Internet, devenu Transport Layer Security en 2001)
);

client.connect();

module.exports = client;


```

- Dans Heroku onglet => `settings` => `config vars` => (au besoin cliquer sur `Reveal config vars`).

- maintenant il faut mettre dans le .env ce DATABASE_URL   par exemple :

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/f0fshopBis

```
- maintenant on déploie nos schémas et tables sur héroku
- en ligne de commande 
  
```bash
sqitch target add heroku postgres://....je copie colle l'URI
```

- maintenant pour déployer 

```bash
sqitch deploy heroku
```
- maintenant dans le sqitch conf je dois avoir une nouvel target qui s'est implémenté   
- exemple sqitch.conf :
```conf
[core]
	engine = pg
	# plan_file = sqitch.plan
	# top_dir = .
[engine "pg"]
	# target = db:pg:fOfshopBis
	# registry = sqitch
client = /usr/lib/postgresql/14/bin/psql
[target "heroku"]
	uri = db:postgres://dscgpuwkgfzwke:3748ddf16145772f0fcbbd4c847bd8c789a979d8fec4ae8caa1a3fea273c0f62@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/d4vspsaregusvj

```

## déploiement

- depuis `student@teleporter:~/Bureau/html/f0f-backBisTestHeroku/data/migrations$` 
- j'envoie l'unique commande  
#### depuis le dossier sqitch (data/migrations...)
```
sqitch deploy heroku
```

- la bdd est déployée
- pour revenir en arrière dans la bdd j'utilise le revert

### Déployer notre application

Maintenant que tout est prêt il n'y a plus qu'à déployer notre application. La bonne nouvelle c'est que ce sera la même pour toutes les nouvelles mises à jours :

- depuis la racine du projet
```bash
git push heroku main
```

Et c'est tout.


pour les mises à jour suivantes
- git add .
- git commit -m "....."
- git push heroku main

