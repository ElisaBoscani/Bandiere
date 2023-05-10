const nav = document.querySelector(".nav");
const bandieraContainer = document.querySelector(".bandiera-container");
const mottoContainer = document.querySelector(".motto-container");

let squadre = [
  { nome: "Inter", selezionata: false, colore1: "blue", colore2: "black" },
  { nome: "Milan", selezionata: false, colore1: "red", colore2: "black" },
  { nome: "Roma", selezionata: false, colore1: "red", colore2: "yellow" },
  { nome: "Napoli", selezionata: false, colore1: "turquoise" },
  { nome: "Juventus", selezionata: false, colore1: "black", colore2: "white" },
  { nome: "Cagliari", selezionata: false, colore1: "red", colore2: "blue" },
];

// --- popolo dinamicamente la navbar di buttons --- //
squadre.forEach((squadra, index) => {
  const btn = document.createElement("button");
  btn.innerHTML = squadra.nome;
  btn.className = "btn";
  nav.appendChild(btn);

  btn.addEventListener("click", () => {
    aggiornaBandieraMotto(index);
  });
});

// --- creazione bandiera --- //
const bandiera = document.createElement("div");
bandiera.className = "bandiera";
bandieraContainer.appendChild(bandiera);

// --- creazione motto --- //
const motto = document.createElement("p");
let tifoSquadra = "Forza ...... !!!";
motto.innerHTML = tifoSquadra;
motto.className = "motto";
mottoContainer.appendChild(motto);

// --- logica --- //

//-- arrow function -- //
const aggiornaBandieraMotto = (id) => {
  bandiera.innerHTML = "";
  let squadreAggiornato = [];

  squadreAggiornato = squadre.map((squadra, index) => {
    if (index === id) {
      return { ...squadra, selezionata: !squadra.selezionata };
    } else {
      return { ...squadra, selezionata: false };
    }
  });

  squadre = squadreAggiornato;

  const squadraSelezionata = squadre.find((_squadra, index) => index === id);

  const buttons = document.querySelectorAll(".btn");
  const arrayBtns = Array.from(buttons);
  const btnSelezionato = arrayBtns.find(
    (btn) => btn.innerHTML === squadraSelezionata.nome
  );

  arrayBtns.forEach((btn) => {
    if (
      btn.innerHTML === btnSelezionato.innerHTML &&
      squadraSelezionata.selezionata === true
    ) {
      return (
        (btn.style.color = "gold"),
        (btn.style.fontWeight = "bold"),
        (btn.style.backgroundColor = "#0f0d83")
      );
    } else {
      return (
        (btn.style.color = "white"), (btn.style.backgroundColor = "#3381ff")
      );
    }
  });

  if (squadraSelezionata.selezionata === true) {
    const tifoAggiornato = tifoSquadra.replace(
      "......",
      squadraSelezionata.nome
    );
    motto.innerHTML = tifoAggiornato;

    if (squadraSelezionata.hasOwnProperty("colore2")) {
      const col1 = document.createElement("div");
      col1.className = "colore";
      col1.style.backgroundColor = squadraSelezionata.colore1;

      const col2 = document.createElement("div");
      col2.className = "colore";
      col2.style.backgroundColor = squadraSelezionata.colore2;

      bandiera.appendChild(col1);
      bandiera.appendChild(col2);
    } else {
      bandiera.style.backgroundColor = squadraSelezionata.colore1;
    }
  } else {
    motto.innerHTML = tifoSquadra;
    bandiera.innerHTML = "";
    bandiera.style.backgroundColor = "gray";
  }
};
