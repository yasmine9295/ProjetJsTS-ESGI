MyBourse

Lancement du projet :
1. Accèder au dossier 

cd projet

2. Installer les dépendances

npm install

3. Lancer le serveur de développement

npm run dev

4. Accéder à l'application

Ouvrir le navigateur à l’adresse indiquée dans le terminal (ex : http://localhost:5173)


gestion des erreurs

- Erreurs réseau : si le serveur est inaccessible
- Erreurs api : si la réponse http est incorrecte 
- Données invalides : si le json reçu est vide ou mal formé
- Erreurs utilisateur : si la sélection est invalide

Toutes les erreurs sont affichées en rouge dans le front via la div "errorMessage" dans l'index

Bonus

- Mode sombre : bouton en haut à droite pour basculer entre mode clair et sombre
- Sauvegarde des préférences : les sélections et le mode sombre sont sauvegardés dans le localStorage, donc quand on actualise on garde les memes valeurs
- Export csv : bouton pour télécharger les données du graphique sous forme de fichier csv