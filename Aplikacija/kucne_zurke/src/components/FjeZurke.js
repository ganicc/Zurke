import axios from "axios";

export const registracijaZurke = (NovaZurka) => {
  console.log("FjeZurke1");
  return axios
    .post("./zurke/registracijaZurke", {
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
