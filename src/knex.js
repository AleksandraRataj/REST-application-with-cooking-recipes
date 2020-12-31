//konfiiguracja biblioteki knex

const knexConfig = require('../knexfile');
//wczutuje biblioteke knex, która exportuje funkcje, która oczekuje podania pliku konfiguracyjnego,
//więc wczytuje funckje i od razu ją wywołuje
const knex = require('knex')(knexConfig);

module.exports = knex;