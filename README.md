# Arosaje

Arosaje est une application web qui permet aux utilisateurs d'aller ou de faire garder des plantes.

## Prérequis

Assurez-vous d'avoir installé Docker sur votre système avant de continuer.

- [Docker](https://www.docker.com/get-started)

## Installation

Clonez ce dépôt sur votre machine locale.

```bash
git clone https://github.com/farkza/arosaje.git
```

## Configuration

### Backend

1. Accédez au dossier `backend`.

```bash
cd backend
```

2. Installez les dépendances Python.

```bash
pip install -r requirements.txt
```

3. Modifiez les variables d'environnement dans le fichier `.env` selon vos besoins.

### Frontend

1. Accédez au dossier `frontend`.

```bash
cd frontend
```

2. Installez les dépendances npm.

```bash
npm install
```

## Utilisation

### Backend

1. Lancez le backend.

```bash
cd backend
cd app
python main.py
```

Le serveur démarrera sur `http://localhost:5000`.

### Frontend

1. Lancez le frontend.

```bash
cd frontend
npm start
```

Le site sera accessible à l'adresse `http://localhost:3000` dans votre navigateur.

## Docker

Pour exécuter l'application à l'aide de Docker, assurez-vous que Docker est en cours d'exécution sur votre système.

1. À la racine du projet, utilisez Docker Compose pour construire et démarrer les conteneurs.

```bash
docker-compose up --build
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Contributions

- [fakza](https://github.com/farkza)
- [mgaisnon](https://github.com/mgaisnon)
- [JulieMontoux](https://github.com/JulieMontoux)
- [yassin312](https://github.com/yassin312)

## Licence

Ce projet est sous licence MIT.
