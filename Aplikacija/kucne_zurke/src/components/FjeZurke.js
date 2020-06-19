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
      return res.data;
    })
    .catch((err) => console.log("Error:" + err));
};


export const prikazZurke = () => {
  return axios
    .get("zurke/prikaz")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log("Error:" + err));
};
