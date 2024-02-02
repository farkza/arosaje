# Utilisez l'image de Python comme base
FROM python:3.9

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/backend

# Copier le fichier requirements.txt dans le conteneur
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install -r requirements.txt

# Copier le contenu du répertoire actuel dans le conteneur
COPY . .

# Commande par défaut pour exécuter l'application backend avec Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
