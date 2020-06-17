This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Starting the project

This project works with a REST API available [here](https://github.com/falia15/symfony4-api.git).
TODO : add project goal and description.

## Initialiase project

``git clone https://github.com/falia15/react-redux-app.git``

``cd react-redux-app``

``cd client/``
``npm install``

``cd ..``
``cd socket/``
``npm install``

In client/src and socket/, copy config.example.js, name it config.js, and add your configuration

## Start the wep application
``cd client/``
``npm start``

## Start the Socket
``cd socket/``
``npm start``


## Run test
``cd client/``
``npm test``


## Procedure mise en prod FR

- Aller sur la branch master
- Aller dans les sous dossier socket/ et client/ et saissisez dans chacun d'entre eux la commande ``npm install``
- Remplissez les fichier de configuration /socket/config.json et /client/src/config.json
- cd client/ et saississez la commande ``npm run build``, celle-ci va regenerer le dossier build/
- Deposer via FTP le dossier socket le dossier build/ dans leur emplacement respectif sur le serveur
