// 1. Définition des classes
class Etudiant {
  constructor(nom, prenom, age, cne) {
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.cne = cne;
  }

  etudier() {
    return ` ${this.prenom} ${this.nom} est en train d'étudier.`;
  }
}

class Professeur {
  constructor(nom, age, cin) {
    this.nom = nom;
    this.age = age;
    this.cin = cin;
  }

  enseigner() {
    return `Le professeur ${this.nom} est en train d'enseigner.`;
  }
}
// 2. Création des instances
const etudiants = [
  new Etudiant("Dupont", "Jean", 20, "A12345"),
  new Etudiant("Martin", "Sophie", 22, "B54321"),
  new Etudiant("Bernard", "Pierre", 21, "C67890"),
];

const professeurs = [
  new Professeur("Legrand", 45, "X987654"),
  new Professeur("Petit", 38, "Y123456"),
];

// 3. Ajout des méthodes (déjà incluses dans les classes ES6)

// 4. Tri des étudiants par nom, puis prénom, puis age
etudiants.sort((a, b) => {
  if (a.nom !== b.nom) return a.nom.localeCompare(b.nom);
  if (a.prenom !== b.prenom) return a.prenom.localeCompare(b.prenom);
  return a.age - b.age;
});

// 5. Affichage des résultats
console.log("=== Liste des étudiants triés ===");
etudiants.forEach((etudiant) => {
  console.log(
    `${etudiant.nom} ${etudiant.prenom}, ${etudiant.age} ans (CNE: ${etudiant.cne})`
  );
});

console.log("\n=== Méthodes spécifiques ===");
console.log(etudiants[0].etudier());
console.log(professeurs[0].enseigner());
