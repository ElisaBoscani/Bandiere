// -------------------------- Elem HTML -------------------------- //
const navbar = document.querySelector(".navbar");
const flagContainer = document.querySelector(".flag-container");
const mottoContainer = document.querySelector(".motto-container");

// ----------------------- Array squadre ------------------------ //
let squadre = [
  { nome: "Inter", col1: "#202120", col2: "#3F74CC", selezionata: false },
  { nome: "Roma", col1: "#FFB200", col2: "#8F031B", selezionata: false },
  { nome: "Juventus", col1: "#EDEDEE", col2: "#000000", selezionata: false },
  { nome: "Milan", col1: "#FD0932", col2: "#000000", selezionata: false },
  { nome: "Napoli", col1: "#2895D6", selezionata: false },
  { nome: "Cagliari", col1: "#CD171A", col2: "#273583", selezionata: false },
  {
    nome: "Italia",
    col1: "#209246",
    col2: "#FFFFFF",
    col3: "#CE2B38",
    selezionata: false,
  },
];

// --------- Creazione buttons all'interno della navbar ---------- //
squadre.forEach((squadra, index) => {
  const button = document.createElement("button");
  button.className = "btn";
  button.innerHTML = squadra.nome;
  navbar.appendChild(button);

  button.addEventListener("click", () => {
    aggiornaBandieraMotto(index);
  });
});

// -------------- Creazione contenitore bandiera --------------- //
const bandiera = document.createElement("div");
bandiera.className = "flag";
flagContainer.appendChild(bandiera);

// --------------------- Creazione motto ---------------------- //
const motto = document.createElement("p");
const mottoIncompleto = "Forza ........";
motto.innerHTML = mottoIncompleto;
motto.className = "motto";
mottoContainer.appendChild(motto);

// ------------------------- Logica -------------------------- //

const aggiornaBandieraMotto = (i) => {
  let squadreAggiornato = [];
  squadreAggiornato = squadre.map((squadra, index) => {
    if (index === i) {
      return { ...squadra, selezionata: !squadra.selezionata };
    } else {
      return { ...squadra, selezionata: false };
    }
  });
  squadre = squadreAggiornato;

  // --- Devo trovare la squadra che è stata cliccata all'interno dell'array --- //
  const squadraSelezionata = squadre.find((_squadra, index) => index === i);

  // --- Per avere sempre il button in stato "selezionato" --- //
  const buttons = document.querySelectorAll(".btn");
  const arrayBtns = Array.from(buttons);
  const btnSelezionato = arrayBtns.find(
    (btn) => btn.innerHTML === squadraSelezionata.nome
  );

  arrayBtns.forEach((btn) => {
    if (btn.innerHTML === btnSelezionato.innerHTML) {
      return (btn.style.color = "rgb(206, 165, 0)");
    } else {
      return (btn.style.color = "rgba(0, 0, 255, 0.649)");
    }
  });

  if (squadraSelezionata.selezionata === true) {
    // --- Svuoto sempre la bandiera per non sovrapporre i colori delle selezioni precedenti -- //
    bandiera.innerHTML = "";

    // --- Aggiorno il motto tramite la manipolazione di stringhe --- //
    const mottoAggiornato = mottoIncompleto.replace(
      "........",
      squadraSelezionata.nome
    );
    motto.innerHTML = mottoAggiornato;

    // ------ Aggiorno i colori della bandiera ------ //
    if (
      squadraSelezionata.hasOwnProperty("col2") &&
      !squadraSelezionata.hasOwnProperty("col3")
    ) {
      const colore1 = document.createElement("div");
      colore1.className = "col1";
      colore1.style.width = "50%";
      colore1.style.height = "auto";
      colore1.style.backgroundColor = squadraSelezionata.col1;

      const colore2 = document.createElement("div");
      colore2.className = "col2";
      colore2.style.width = "50%";
      colore2.style.height = "auto";
      colore2.style.backgroundColor = squadraSelezionata.col2;

      bandiera.appendChild(colore1);
      bandiera.appendChild(colore2);
    } else if (squadraSelezionata.hasOwnProperty("col3")) {
      const colore1 = document.createElement("div");
      colore1.style.width = "33.33%";
      colore1.style.height = "auto";
      colore1.style.backgroundColor = squadraSelezionata.col1;

      const colore2 = document.createElement("div");
      colore2.style.width = "33.33%";
      colore2.style.height = "auto";
      colore2.style.backgroundColor = squadraSelezionata.col2;

      const colore3 = document.createElement("div");
      colore3.style.width = "33.33%";
      colore3.style.height = "auto";
      colore3.style.backgroundColor = squadraSelezionata.col3;

      bandiera.appendChild(colore1);
      bandiera.appendChild(colore2);
      bandiera.appendChild(colore3);
    } else {
      bandiera.style.backgroundColor = squadraSelezionata.col1;
    }
  } else {
    // --- Riporto il motto allo stato iniziale --- //
    motto.innerHTML = mottoIncompleto;

    // ------ Svuoto la bandiera ------ //
    bandiera.innerHTML = "";
    bandiera.style.backgroundColor = "whitesmoke";
  }
};
