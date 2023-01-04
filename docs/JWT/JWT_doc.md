# Renvoyer toutes les infos de l'utilisateur en clair au front

# stockage du token côté client avec httpOnly cookie ( "cookie-parser" ??)
```js
res.cookie("refreshToken", newToken.token, {
          httpOnly: true,
          sameSite: "strict",
});
```
# stockage du refreshToken en bdd


### QUESTIONS
sur quelles routes inserer verifyJWT c'est un middleware:
1. uniquement sur certaines routes (à définir)
2. sur un ensemble de routes avec app.use(verifyJWT)