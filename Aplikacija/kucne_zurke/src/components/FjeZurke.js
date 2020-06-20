import axios from "axios";


export const registracijaZurke = (NovaZurka) => {
  console.log("FjeZurke1");
  return axios
    .post("zurke/register", {
      organizator: NovaZurka.organizator,
      naziv: NovaZurka.naziv,
      opis: NovaZurka.opis,
      tipZurke: NovaZurka.tipZurke,
      brojljudi: NovaZurka.brojljudi,
      datumOdrzavanja: NovaZurka.datumOdrzavanja,
    })
    .then((res) => {
      console.log("FjeZurke2");
      console.log(res.data);
      return res.data;
    });
};


export const prikazSvihZurki = () => {
  return axios
    .get("zurke/")
    .then((res) => {
      console.log(res.data);
      return res.data
    })
    .catch((err) => console.log("Error:" + err));
};


export const prikazZurke = (nazivZurke) => {
  return axios
    .get("zurke/")
    .then((res) => {
      const zurke=res.data;
      const filtriraneZurke=zurke.filter(zurka=>zurka.naziv===nazivZurke);
      console.log(res.data);
      console.log(filtriraneZurke);
      return filtriraneZurke;
    })
    .catch((err) => console.log("Error:" + err));
};
