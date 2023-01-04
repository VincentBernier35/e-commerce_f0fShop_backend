# Je me connecte en tant que oblog
export PGUSER=f0fshop

# Déploiement de la version
sqitch deploy db:pg:f0fshop 1.tables

