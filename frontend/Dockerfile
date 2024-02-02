# Utilisez l'image de Node.js comme base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/frontend

# Copier le fichier package.json dans le conteneur
COPY package.json .

# Installer les dépendances du frontend
RUN npm install

# Copier le contenu du répertoire actuel dans le conteneur
COPY . .

# Construire l'application React
RUN npm run build

# Commande par défaut pour exécuter le serveur frontend (c'est généralement inutile pour une application React, mais nous le gardons pour la cohérence)
CMD ["npm", "start"]
