Connexion heroku
email : ecommercef0f@gmail.com
mdp : GloireauF0F! 

https://kourou.oclock.io/ressources/fiche-recap/heroku/

Commande à exécuter dans le terminal
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
heroku –version ==> heroku/7.60.2 linux-x64 node-v14.19.0

Commande à exécuter dans l'émulateur de terminal
heroku git:remote -a gloireaufof ==> set git remote heroku to https://git.heroku.com/gloireaufof.git

git remote -v ==>
heroku  https://git.heroku.com/gloireaufof.git (fetch)
heroku  https://git.heroku.com/gloireaufof.git (push)
origin  git@github.com:O-clock-Cassini/projet-2-e-commerce-f0f-back.git (fetch)
origin  git@github.com:O-clock-Cassini/projet-2-e-commerce-f0f-back.git (push)

pour ajouter les nouvelles versions sur heroku 
git add .
git commit -m "nouveau commit"
git push heroku main (et pas master)