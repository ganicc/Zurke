import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("users/register", {
      ime: newUser.ime,
      prezime: newUser.prezime,
      korisnickoIme: newUser.korisnickoIme,
      sifra: newUser.sifra,
      datumRodj: newUser.datumRodj,
      email: newUser.email,
      pol: newUser.pol,
    })
    .then((response) => {
      console.log(newUser.korisnickoIme + " je registrovan.");
    });
};

export const login = (User) => {
  return axios
    .post("users/login", {
      korisnickoIme: User.korisnickoIme,
      sifra: User.sifra,
    })
    .then((res) => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch((err) => console.log("Error: " + err));
};
