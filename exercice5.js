//Gestion des livres (Array)
let books = ["Livre1", "Livre2", "Livre3"];
books.push("la boite a merveilles");
books.unshift("Le Petit Prince");
books.pop();
books.shift();
//Gestion des catégories (Set)
let categories = new Set(["Fiction", "Science", "Histoire"]);
categories.add("Biographie");
categories.delete("Science");

//Gestion des emprunts (Map)
let borrows = new Map();
borrows.set("Livre1", "Emprunteur1");
borrows.delete("Livre1");
borrows.has("Livre2");
