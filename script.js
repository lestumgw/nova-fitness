
document.addEventListener("DOMContentLoaded", () => {
  const cartes = [
    ...document.querySelectorAll(".abonnement-carte")
  ];

  const gauche = document.querySelector(".fleche-gauche");
  const droite = document.querySelector(".fleche-droite");

  if (cartes.length !== 3 || !gauche || !droite) return;

  // L'offre PLUS est au centre au démarrage
  let active = 1;
  let animationEnCours = false;

  function actualiser() {
    cartes.forEach((carte, index) => {
      const difference = (index - active + 3) % 3;

      carte.classList.remove(
        "position-gauche",
        "position-centre",
        "position-droite",
        "carte-active"
      );

      if (difference === 0) {
        carte.classList.add(
          "position-centre",
          "carte-active"
        );
      } else if (difference === 1) {
        carte.classList.add("position-droite");
      } else {
        carte.classList.add("position-gauche");
      }

      const estActive = index === active;

      carte.inert = !estActive;
      carte.setAttribute(
        "aria-hidden",
        String(!estActive)
      );
    });
  }

  function tourner(direction) {
    if (animationEnCours) return;

    animationEnCours = true;
    active = (active + direction + 3) % 3;

    actualiser();

    setTimeout(() => {
      animationEnCours = false;
    }, 850);
  }

  gauche.addEventListener("click", () => tourner(-1));
  droite.addEventListener("click", () => tourner(1));

  actualiser();
});

/* PLANNING DES COURS COLLECTIFS */

document.addEventListener("DOMContentLoaded", () => {
  const planning = {
    lundi: [
      ["09:00", "STRETCHING", "45 min", "Tous niveaux"],
      ["18:30", "HIIT", "45 min", "Intermédiaire"]
    ],
    mardi: [
      ["12:30", "CYCLING", "45 min", "Tous niveaux"],
      ["19:00", "RENFORCEMENT", "60 min", "Tous niveaux"]
    ],
    mercredi: [
      ["18:00", "HIIT", "45 min", "Intermédiaire"],
      ["19:00", "STRETCHING", "45 min", "Tous niveaux"]
    ],
    jeudi: [
      ["12:30", "RENFORCEMENT", "45 min", "Tous niveaux"],
      ["18:30", "CYCLING", "45 min", "Tous niveaux"]
    ],
    vendredi: [
      ["17:30", "HIIT", "45 min", "Intermédiaire"],
      ["18:30", "CYCLING", "45 min", "Tous niveaux"]
    ],
    samedi: [
      ["10:00", "RENFORCEMENT", "60 min", "Tous niveaux"]
    ]
  };

  const boutons = document.querySelectorAll(".jour");
  const conteneur = document.querySelector("#planning-seances");

  if (!conteneur || !boutons.length) return;

  function afficherJour(jour) {
    const seances = planning[jour] || [];

    conteneur.innerHTML = seances.map(seance => `
      <article class="seance">
        <div class="seance-heure">${seance[0]}</div>
        <div class="seance-details">
          <h3>${seance[1]}</h3>
          <p>${seance[2]} · ${seance[3]}</p>
        </div>
      </article>
    `).join("");

    boutons.forEach(bouton => {
      const actif = bouton.dataset.jour === jour;
      bouton.classList.toggle("actif", actif);
      bouton.setAttribute("aria-pressed", String(actif));
    });
  }

  boutons.forEach(bouton => {
    bouton.addEventListener("click", () => {
      afficherJour(bouton.dataset.jour);
    });
  });

  afficherJour("lundi");
});

/* FORMULAIRE D'ESSAI - DEMONSTRATION */

document.addEventListener("DOMContentLoaded", () => {
  const formulaire = document.querySelector("#formulaire-essai");
  const message = document.querySelector("#message-essai");

  if (!formulaire || !message) return;

  formulaire.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!formulaire.reportValidity()) return;

    message.textContent =
      "Formulaire de démonstration : aucune demande n'a été envoyée.";

    message.style.color = "#435849";
  });
});


/* ANIMATIONS DISCRÈTES AU DÉFILEMENT */
document.addEventListener("DOMContentLoaded", () => {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const elements = document.querySelectorAll(
    ".introduction > *, .espaces-entete, .espace-carte, .abonnements-entete, .cours-entete, .planning, .coachs-entete, .coach-carte, .contact-fitness-entete, .contact-fitness-infos, .contact-fitness-formulaire"
  );
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("nova-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
  elements.forEach((element, index) => {
    element.classList.add("nova-reveal-ready");
    element.style.transitionDelay = `${(index % 3) * 70}ms`;
    observer.observe(element);
  });
});
