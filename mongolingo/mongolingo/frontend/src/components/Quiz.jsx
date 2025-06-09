import React, { useState, useEffect } from 'react';
import './Quiz.css'; // Fichier CSS pour le style (à créer si nécessaire)

const questions = [
  // Question 1
  {
    question: "Quelle requête permet de trouver l’adresse email de Jean-François Kamp ?",
    answers: [
      'db.joueurs.find({ "pseudo": "Jean-François Kamp" }, { "email": 1, "_id": 0 })',
      'db.joueurs.find({ "email": "jf.kamp@gmail.com" }, { "pseudo": 1, "_id": 0 })',
      'db.joueurs.find({ "pseudo": "Jean-François Kamp" }, { "_id": 1 })',
      'db.joueurs.find({ "pseudo": "Jean-François Kamp" })',
    ],
    correctAnswer: 0,
  },
  // Question 2
  {
    question: "Comment lister les pseudos des joueurs participant à Pokémon Soleil et Lune ?",
    answers: [
      'db.joueurs.find({ "jeux": ObjectId("66f4a1b2c3d4e5f67890126a") }, { "pseudo": 1, "_id": 0 })',
      'db.jeux.find({ "jeu_nom": "Pokémon Soleil et Lune" }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({ "jeux": "Pokémon Soleil et Lune" }, { "pseudo": 1, "_id": 0 })',
      'db.joueurs.find({ "jeu_nom": "Pokémon Soleil et Lune" }, { "pseudo": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 3
  {
    question: "Quelle requête retourne les noms des jeux sur la plateforme Nintendo DS ?",
    answers: [
      'db.jeux.find({ "plateforme": "Nintendo DS" }, { "jeu_nom": 1, "_id": 0 })',
      'db.jeux.find({ "plateforme": "Nintendo DS" }, { "jeu_nom": 1 })',
      'db.jeux.find({ "plateforme": "Nintendo DS" })',
      'db.jeux.find({ "jeu_nom": "Nintendo DS" }, { "plateforme": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 4
  {
    question: "Comment lister les jeux des générations 1, 2, ou 3 ?",
    answers: [
      'db.jeux.find({ "generation": { $in: ["1", "2", "3"] } }, { "jeu_nom": 1, "_id": 0 })',
      'db.jeux.find({ "generation": ["1", "2", "3"] }, { "jeu_nom": 1, "_id": 0 })',
      'db.jeux.find({ "generation": { $eq: ["1", "2", "3"] } }, { "jeu_nom": 1, "_id": 0 })',
      'db.jeux.find({ "generation": { $all: ["1", "2", "3"] } }, { "jeu_nom": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 5
  {
    question: "Quelle requête donne la plateforme du jeu Pokémon Épée et Bouclier ?",
    answers: [
      'db.jeux.find({ "jeu_nom": "Pokémon Épée et Bouclier" }, { "plateforme": 1, "_id": 0 })',
      'db.jeux.find({ "jeu_nom": "Pokémon Épée et Bouclier" }, { "plateforme": 1 })',
      'db.jeux.find({ "plateforme": "Pokémon Épée et Bouclier" }, { "jeu_nom": 1, "_id": 0 })',
      'db.jeux.find({ "jeu_nom": "Pokémon Épée et Bouclier" })',
    ],
    correctAnswer: 0,
  },
  // Question 6
  {
    question: "Comment obtenir les attaques du Pokémon Dracolosse ?",
    answers: [
      'db.pokemons.find({ "pokemon_nom": "Dracolosse" }, { "attaques": 1, "_id": 0 })',
      'db.pokemons.find({ "pokemon_nom": "Dracolosse" }, { "attaques": 1 })',
      'db.pokemons.find({ "attaques": "Dracolosse" }, { "pokemon_nom": 1, "_id": 0 })',
      'db.pokemons.find({ "pokemon_nom": "Dracolosse" })',
    ],
    correctAnswer: 0,
  },
  // Question 7
  {
    question: "Quelle requête retourne le(s) talent(s) du Pokémon Carchacrok ?",
    answers: [
      'db.pokemons.find({ "pokemon_nom": "Carchacrok" }, { "talent": 1, "_id": 0 })',
      'db.pokemons.find({ "talent": "Carchacrok" }, { "pokemon_nom": 1, "_id": 0 })',
      'db.pokemons.find({ "pokemon_nom": "Carchacrok" }, { "talent": 1 })',
      'db.pokemons.find({ "pokemon_nom": "Carchacrok" })',
    ],
    correctAnswer: 0,
  },
  // Question 8
  {
    question: "Comment lister les noms des Pokémon tenant l’objet Orbe Vie ?",
    answers: [
      'db.pokemons.find({ "objet": "Orbe Vie" }, { "pokemon_nom": 1, "_id": 0 })',
      'db.pokemons.find({ "objet": "Orbe Vie" }, { "pokemon_nom": 1 })',
      'db.pokemons.find({ "pokemon_nom": "Orbe Vie" }, { "objet": 1, "_id": 0 })',
      'db.pokemons.find({ "objet": "Orbe Vie" })',
    ],
    correctAnswer: 0,
  },
  // Question 9
  {
    question: "Quelle requête donne les noms des Pokémon jouant l’attaque Séisme ?",
    answers: [
      'db.pokemons.find({ "attaques": "Séisme" }, { "pokemon_nom": 1, "_id": 0 })',
      'db.pokemons.find({ "attaques": "Séisme" }, { "pokemon_nom": 1 })',
      'db.pokemons.find({ "pokemon_nom": "Séisme" }, { "attaques": 1, "_id": 0 })',
      'db.pokemons.find({ "attaques": "Séisme" })',
    ],
    correctAnswer: 0,
  },
  // Question 10
  {
    question: "Comment lister les noms des Pokémon avec le talent Intimidation ?",
    answers: [
      'db.pokemons.find({ "talent": "Intimidation" }, { "pokemon_nom": 1, "_id": 0 })',
      'db.pokemons.find({ "talent": "Intimidation" }, { "pokemon_nom": 1 })',
      'db.pokemons.find({ "pokemon_nom": "Intimidation" }, { "talent": 1, "_id": 0 })',
      'db.pokemons.find({ "talent": "Intimidation" })',
    ],
    correctAnswer: 0,
  },
  // Question 11
  {
    question: "Quelle requête affiche chaque duo et les pseudos de ses joueurs ?",
    answers: [
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 1 } }])',
      'db.duos.find({}, { "joueurs": 1, "_id": 1 })',
      'db.joueurs.find({}, { "duos": 1, "pseudo": 1 })',
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "_id", foreignField: "duos", as: "membres" } }, { $project: { "membres.pseudo": 1 } }])',
    ],
    correctAnswer: 0,
  },
  // Question 12
  {
    question: "Comment lister les pseudos des joueurs dans un duo ayant au moins 6 victoires ?",
    answers: [
      'db.duos.aggregate([{ $match: { "victoires": { $gte: 6 } } }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 0 } }])',
      'db.duos.find({ "victoires": { $gte: 6 } }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({ "victoires": { $gte: 6 } }, { "pseudo": 1, "_id": 0 })',
      'db.duos.aggregate([{ $match: { "victoires": 6 } }, { $lookup: { from: "joueurs", localField: "_id", foreignField: "duos", as: "membres" } }, { $project: { "membres.pseudo": 1 } }])',
    ],
    correctAnswer: 0,
  },
  // Question 13
  {
    question: "Quelle requête calcule le taux de victoires de chaque duo et affiche leurs joueurs ?",
    answers: [
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "taux_victoire": { $cond: [{ $eq: ["$parties_jouees", 0] }, 0, { $divide: ["$victoires", "$parties_jouees"] }] }, "_id": 0 } }])',
      'db.duos.find({}, { "victoires": 1, "parties_jouees": 1, "_id": 0 })',
      'db.duos.aggregate([{ $project: { "taux_victoire": { $divide: ["$victoires", "$parties_jouees"] } } }])',
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "_id", foreignField: "duos", as: "membres" } }, { $project: { "membres.pseudo": 1 } }])',
    ],
    correctAnswer: 0,
  },
  // Question 14
  {
    question: "Comment lister les pseudos des joueurs d’un duo ayant joué exactement 8 parties ?",
    answers: [
      'db.duos.aggregate([{ $match: { "parties_jouees": 8 } }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 0 } }])',
      'db.duos.find({ "parties_jouees": 8 }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({ "parties_jouees": 8 }, { "pseudo": 1, "_id": 0 })',
      'db.duos.aggregate([{ $match: { "parties_jouees": 8 } }, { $lookup: { from: "joueurs", localField: "_id", foreignField: "duos", as: "membres" } }, { $project: { "membres.pseudo": 1 } }])',
    ],
    correctAnswer: 0,
  },
  // Question 15 (modifiée)
  {
    question: "Quelle requête affiche les noms des Pokémon dans l’équipe de Mathieu Le Lain ?",
    answers: [
      'db.joueurs.aggregate([{ $match: { "pseudo": "Mathieu Le Lain" } }, { $lookup: { from: "equipes", localField: "equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $project: { "pokemons.pokemon_nom": 1, "_id": 0 } }])',
      'db.joueurs.aggregate([{ $match: { "pseudo": "Mathieu Le Lain" } }, { $lookup: { from: "pokemons", localField: "equipes", foreignField: "_id", as: "pokemons" } }, { $unwind: "$pokemons" }, { $lookup: { from: "equipes", localField: "pokemons.equipe", foreignField: "_id", as: "equipe" } }, { $project: { "pokemons.pokemon_nom": 1, "_id": 0 } }])',
      'db.joueurs.find({ "pseudo": "Mathieu Le Lain" }, { "equipes": 1, "_id": 0 })',
      'db.pokemons.find({ "joueurs": "Mathieu Le Lain" }, { "pokemon_nom": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 16 (modifiée)
  {
    question: "Comment obtenir le nom du premier Pokémon de l’équipe d’Hélène Tuffigo ?",
    answers: [
      'db.joueurs.aggregate([{ $match: { "pseudo": "Hélène Tuffigo" } }, { $lookup: { from: "equipes", localField: "equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $project: { "premier_pokemon": { $arrayElemAt: ["$pokemons.pokemon_nom", 0] }, "_id": 0 } }])',
      'db.joueurs.aggregate([{ $match: { "pseudo": "Hélène Tuffigo" } }, { $lookup: { from: "equipes", localField: "equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $project: { "dernier_pokemon": { $arrayElemAt: ["$pokemons.pokemon_nom", -1] }, "_id": 0 } }])',
      'db.joueurs.find({ "pseudo": "Hélène Tuffigo" }, { "equipes": 1, "_id": 0 })',
      'db.pokemons.find({ "joueurs": "Hélène Tuffigo" }, { "pokemon_nom": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 17 (modifiée)
  {
    question: "Quelle requête trouve le duo de Tom Ferragut et affiche les pseudos de ses membres ?",
    answers: [
      'db.duos.aggregate([{ $match: { "joueurs": ObjectId("66f4a1b2c3d4e5f67890123a") } }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 1 } }])',
      'db.duos.aggregate([{ $match: { "joueurs": ObjectId("66f4a1b2c3d4e5f67890123a") } }, { $lookup: { from: "joueurs", localField: "_id", foreignField: "duos", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 1 } }])',
      'db.joueurs.find({ "pseudo": "Tom Ferragut" }, { "duos": 1, "_id": 0 })',
      'db.duos.find({ "joueurs": "Tom Ferragut" }, { "joueurs": 1, "_id": 1 })',
    ],
    correctAnswer: 0,
  },
  // Question 18 (modifiée)
  {
    question: "Comment lister les noms des jeux auxquels participe Goulven Kerbellec ?",
    answers: [
      'db.joueurs.aggregate([{ $match: { "pseudo": "Goulven Kerbellec" } }, { $lookup: { from: "jeux", localField: "jeux", foreignField: "_id", as: "jeux_participes" } }, { $project: { "jeux_participes.jeu_nom": 1, "_id": 0 } }])',
      'db.joueurs.aggregate([{ $match: { "pseudo": "Goulven Kerbellec" } }, { $lookup: { from: "jeux", localField: "_id", foreignField: "joueurs", as: "jeux_participes" } }, { $project: { "jeux_participes.jeu_nom": 1, "_id": 0 } }])',
      'db.joueurs.find({ "pseudo": "Goulven Kerbellec" }, { "jeux": 1, "_id": 0 })',
      'db.jeux.find({ "joueurs": "Goulven Kerbellec" }, { "jeu_nom": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 19 (modifiée)
  {
    question: "Quelle requête affiche les pseudos des joueurs ayant un Pokémon avec l’attaque Flamme Bleue ?",
    answers: [
      'db.joueurs.aggregate([{ $lookup: { from: "equipes", localField: "equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $match: { "pokemons.attaques": "Flamme Bleue" } }, { $project: { "pseudo": 1, "_id": 0 } }])',
      'db.joueurs.aggregate([{ $lookup: { from: "pokemons", localField: "equipes", foreignField: "_id", as: "pokemons" } }, { $unwind: "$pokemons" }, { $lookup: { from: "equipes", localField: "pokemons.equipe", foreignField: "_id", as: "equipe" } }, { $match: { "pokemons.attaques": "Flamme Bleue" } }, { $project: { "pseudo": 1, "_id": 0 } }])',
      'db.pokemons.find({ "attaques": "Flamme Bleue" }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({ "attaques": "Flamme Bleue" }, { "pseudo": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 20 (modifiée)
  {
    question: "Comment lister les pseudos des joueurs d’un duo dont les Pokémon jouent l’attaque Séisme ?",
    answers: [
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "equipes", localField: "membres.equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $match: { "pokemons.attaques": "Séisme" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" } } }, { $project: { "joueurs": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "pokemons", localField: "membres.equipes", foreignField: "_id", as: "pokemons" } }, { $unwind: "$pokemons" }, { $lookup: { from: "equipes", localField: "pokemons.equipe", foreignField: "_id", as: "equipe" } }, { $match: { "pokemons.attaques": "Séisme" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" } } }, { $project: { "joueurs": 1, "_id": 0 } }])',
      'db.duos.find({ "attaques": "Séisme" }, { "joueurs": 1, "_id": 0 })',
      'db.pokemons.find({ "attaques": "Séisme" }, { "duos": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 21 (modifiée)
  {
    question: "Quelle requête affiche les pseudos des joueurs du duo ayant le plus de victoires ?",
    answers: [
      'db.duos.aggregate([{ $sort: { "victoires": -1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $sort: { "victoires": 1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 0 } }])',
      'db.duos.find({ "victoires": { $max: 1 } }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({}, { "victoires": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 22 (modifiée)
  {
    question: "Comment lister les pseudos des joueurs participant à Pokémon Épée et Bouclier avec un Galvagon dans leur équipe ?",
    answers: [
      'db.joueurs.aggregate([{ $match: { "jeux": ObjectId("66f4a1b2c3d4e5f67890126b") } }, { $lookup: { from: "equipes", localField: "equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $match: { "pokemons.pokemon_nom": "Galvagon" } }, { $project: { "pseudo": 1, "_id": 0 } }])',
      'db.joueurs.aggregate([{ $match: { "jeux": ObjectId("66f4a1b2c3d4e5f67890126b") } }, { $lookup: { from: "pokemons", localField: "equipes", foreignField: "_id", as: "pokemons" } }, { $unwind: "$pokemons" }, { $lookup: { from: "equipes", localField: "pokemons.equipe", foreignField: "_id", as: "equipe" } }, { $match: { "pokemons.pokemon_nom": "Galvagon" } }, { $project: { "pseudo": 1, "_id": 0 } }])',
      'db.joueurs.find({ "jeux": "Pokémon Épée et Bouclier" }, { "pokemons": "Galvagon" })',
      'db.pokemons.find({ "pokemon_nom": "Galvagon" }, { "joueurs": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 23 (modifiée)
  {
    question: "Quelle requête affiche les pseudos des joueurs du duo ayant le plus de défaites ?",
    answers: [
      'db.duos.aggregate([{ $project: { joueurs: 1, defaites: { $subtract: ["$parties_jouees", "$victoires"] } } }, { $sort: { "defaites": -1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $project: { joueurs: 1, defaites: { $subtract: ["$victoires", "$parties_jouees"] } } }, { $sort: { "defaites": -1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $project: { "membres.pseudo": 1, "_id": 0 } }])',
      'db.duos.find({ "defaites": { $max: 1 } }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({}, { "defaites": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 24 (modifiée)
  {
    question: "Comment lister les pseudos et Pokémon des joueurs d’un duo avec un Pokémon ayant le talent Multiécaille ?",
    answers: [
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "equipes", localField: "membres.equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $match: { "pokemons.talent": "Multiécaille" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, pokemons: { $push: "$pokemons.pokemon_nom" } } }, { $project: { "joueurs": 1, "pokemons": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "pokemons", localField: "membres.equipes", foreignField: "_id", as: "pokemons" } }, { $unwind: "$pokemons" }, { $lookup: { from: "equipes", localField: "pokemons.equipe", foreignField: "_id", as: "equipe" } }, { $match: { "pokemons.talent": "Multiécaille" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, pokemons: { $push: "$pokemons.pokemon_nom" } } }, { $project: { "joueurs": 1, "pokemons": 1, "_id": 0 } }])',
      'db.pokemons.find({ "talent": "Multiécaille" }, { "joueurs": 1, "_id": 0 })',
      'db.duos.find({ "talent": "Multiécaille" }, { "joueurs": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 25 (modifiée)
  {
    question: "Quelle requête affiche les pseudos et Pokémon des joueurs d’un duo avec un Pokémon ayant le talent Épine de Fer et l’objet Casque Brut ?",
    answers: [
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "equipes", localField: "membres.equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $match: { $and: [{ "pokemons.talent": "Épine de Fer" }, { "pokemons.objet": "Casque Brut" }] } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, pokemons: { $push: "$pokemons.pokemon_nom" } } }, { $project: { "joueurs": 1, "pokemons": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "equipes", localField: "membres.equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $match: { $or: [{ "pokemons.talent": "Épine de Fer" }, { "pokemons.objet": "Casque Brut" }] } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, pokemons: { $push: "$pokemons.pokemon_nom" } } }, { $project: { "joueurs": 1, "pokemons": 1, "_id": 0 } }])',
      'db.pokemons.find({ "talent": "Épine de Fer", "objet": "Casque Brut" }, { "joueurs": 1, "_id": 0 })',
      'db.duos.find({ "talent": "Épine de Fer", "objet": "Casque Brut" }, { "joueurs": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 26 (modifiée)
  {
    question: "Comment lister les pseudos et Pokémon des joueurs du duo ayant le plus de parties jouées ?",
    answers: [
      'db.duos.aggregate([{ $sort: { "parties_jouees": -1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "equipes", localField: "membres.equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, pokemons: { $push: "$pokemons.pokemon_nom" } } }, { $project: { "joueurs": 1, "pokemons": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $sort: { "parties_jouees": 1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "equipes", localField: "membres.equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, pokemons: { $push: "$pokemons.pokemon_nom" } } }, { $project: { "joueurs": 1, "pokemons": 1, "_id": 0 } }])',
      'db.duos.find({ "parties_jouees": { $max: 1 } }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({}, { "parties_jouees": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 27 (modifiée)
  {
    question: "Quelle requête affiche le nombre de victoires et les pseudos du duo jouant sur Game Boy Advance avec le plus de victoires ?",
    answers: [
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "jeux", localField: "membres.jeux", foreignField: "_id", as: "jeux" } }, { $match: { "jeux.plateforme": "Game Boy Advance" } }, { $group: { _id: "$_id", victoires: { $first: "$victoires" }, joueurs: { $push: "$membres.pseudo" } } }, { $sort: { "victoires": -1 } }, { $limit: 1 }, { $project: { "joueurs": 1, "victoires": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "jeux", localField: "membres.jeux", foreignField: "_id", as: "jeux" } }, { $match: { "jeux.plateforme": "Game Boy Advance" } }, { $group: { _id: "$_id", victoires: { $first: "$victoires" }, joueurs: { $push: "$membres.pseudo" } } }, { $sort: { "victoires": 1 } }, { $limit: 1 }, { $project: { "joueurs": 1, "victoires": 1, "_id": 0 } }])',
      'db.duos.find({ "plateforme": "Game Boy Advance" }, { "victoires": 1, "_id": 0 })',
      'db.joueurs.find({ "jeux": "Game Boy Advance" }, { "victoires": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 28 (modifiée)
  {
    question: "Comment lister les pseudos et générations des jeux du duo ayant joué le moins de parties ?",
    answers: [
      'db.duos.aggregate([{ $sort: { "parties_jouees": 1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "jeux", localField: "membres.jeux", foreignField: "_id", as: "jeux" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, generations: { $push: "$jeux.generation" } } }, { $project: { "joueurs": 1, "generations": 1, "_id": 0 } }])',
      'db.duos.aggregate([{ $sort: { "parties_jouees": -1 } }, { $limit: 1 }, { $lookup: { from: "joueurs", localField: "joueurs", foreignField: "_id", as: "membres" } }, { $unwind: "$membres" }, { $lookup: { from: "jeux", localField: "membres.jeux", foreignField: "_id", as: "jeux" } }, { $group: { _id: "$_id", joueurs: { $push: "$membres.pseudo" }, generations: { $push: "$jeux.generation" } } }, { $project: { "joueurs": 1, "generations": 1, "_id": 0 } }])',
      'db.duos.find({ "parties_jouees": { $min: 1 } }, { "joueurs": 1, "_id": 0 })',
      'db.joueurs.find({}, { "parties_jouees": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 29 (modifiée)
  {
    question: "Quelle requête affiche le nom et le nombre total de parties du jeu avec le moins de parties jouées ?",
    answers: [
      'db.joueurs.aggregate([{ $unwind: "$jeux" }, { $lookup: { from: "duos", localField: "_id", foreignField: "joueurs", as: "duos" } }, { $unwind: "$duos" }, { $group: { _id: "$jeux", total_parties: { $sum: "$duos.parties_jouees" } } }, { $lookup: { from: "jeux", localField: "_id", foreignField: "_id", as: "jeu" } }, { $unwind: "$jeu" }, { $sort: { "total_parties": 1 } }, { $limit: 1 }, { $project: { "jeu.jeu_nom": 1, "total_parties": 1, "_id": 0 } }])',
      'db.joueurs.aggregate([{ $unwind: "$jeux" }, { $lookup: { from: "duos", localField: "_id", foreignField: "joueurs", as: "duos" } }, { $unwind: "$duos" }, { $group: { _id: "$jeux", total_parties: { $sum: "$duos.victoires" } } }, { $lookup: { from: "jeux", localField: "_id", foreignField: "_id", as: "jeu" } }, { $unwind: "$jeu" }, { $sort: { "total_parties": 1 } }, { $limit: 1 }, { $project: { "jeu.jeu_nom": 1, "total_parties": 1, "_id": 0 } }])',
      'db.jeux.find({}, { "parties_jouees": 1, "_id": 0 })',
      'db.duos.find({}, { "jeux": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
  // Question 30 (modifiée)
  {
    question: "Comment lister les pseudos des joueurs participant à un jeu de génération 4 avec un Pokémon tenant l’objet Restes ?",
    answers: [
      'db.joueurs.aggregate([{ $match: { "jeux": { $in: db.jeux.find({ "generation": "4" }, { "_id": 1 }).toArray().map(x => x._id) } } }, { $lookup: { from: "equipes", localField: "equipes", foreignField: "_id", as: "equipe" } }, { $unwind: "$equipe" }, { $lookup: { from: "pokemons", localField: "equipe.pokemons", foreignField: "_id", as: "pokemons" } }, { $match: { "pokemons.objet": "Restes" } }, { $project: { "pseudo": 1, "_id": 0 } }])',
      'db.joueurs.aggregate([{ $match: { "jeux": { $in: db.jeux.find({ "generation": "4" }, { "_id": 1 }).toArray().map(x => x._id) } } }, { $lookup: { from: "pokemons", localField: "equipes", foreignField: "_id", as: "pokemons" } }, { $unwind: "$pokemons" }, { $lookup: { from: "equipes", localField: "pokemons.equipe", foreignField: "_id", as: "equipe" } }, { $match: { "pokemons.objet": "Restes" } }, { $project: { "pseudo": 1, "_id": 0 } }])',
      'db.joueurs.find({ "generation": "4", "objet": "Restes" }, { "pseudo": 1, "_id": 0 })',
      'db.pokemons.find({ "objet": "Restes" }, { "joueurs": 1, "_id": 0 })',
    ],
    correctAnswer: 0,
  },
];

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Mélanger les réponses à chaque nouvelle question
  useEffect(() => {
    const originalAnswers = questions[currentQuestion].answers;
    const originalCorrectIndex = questions[currentQuestion].correctAnswer;
    const shuffled = shuffleArray(originalAnswers.map((answer, index) => ({ answer, originalIndex: index })));
    setShuffledAnswers(shuffled.map(item => item.answer));
    const newCorrectIndex = shuffled.findIndex(item => item.originalIndex === originalCorrectIndex);
    setCorrectAnswerIndex(newCorrectIndex);
  }, [currentQuestion]);

  const handleAnswerChange = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setFeedback('Veuillez sélectionner une réponse !');
      return;
    }

    if (selectedAnswer === correctAnswerIndex) {
      setScore(score + 1);
      setFeedback('Bonne réponse !');
    } else {
      setFeedback(`Mauvaise réponse. La bonne réponse était : ${shuffledAnswers[correctAnswerIndex]}`);
    }

    setTimeout(() => {
      setFeedback('');
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setFeedback('');
  };

  if (showResult) {
    return (
      <div className="quiz-container">
        <h2>Résultat du Quiz</h2>
        <p>Votre score : {score} / {questions.length}</p>
        <button onClick={restartQuiz}>Recommencer</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestion + 1} / {questions.length}</h2>
      <p>{questions[currentQuestion].question}</p>
      <form>
        {shuffledAnswers.map((answer, index) => (
          <div key={index} className="answer-option">
            <input
              type="radio"
              id={`answer-${index}`}
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => handleAnswerChange(index)}
            />
            <label htmlFor={`answer-${index}`}>{answer}</label>
          </div>
        ))}
      </form>
      <button onClick={handleSubmit} disabled={selectedAnswer === null}>
        Valider
      </button>
      {feedback && <p className="feedback">{feedback}</p>}
      <p>Score actuel : {score}</p>
    </div>
  );
};

export default Quiz;
