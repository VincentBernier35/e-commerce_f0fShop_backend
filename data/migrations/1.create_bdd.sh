# Fichier de création de ma BDD
export PGUSER=postgres

## On crèe un utilisateur
createuser f0fshop

## On crèe la BDD avec l'utilisateur comme owner
createdb f0fshop -O f0fshop

