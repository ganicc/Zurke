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
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const login = (User) => {
  return axios
    .post("users/login", {
      korisnickoIme: User.korisnickoIme,
      sifra: User.sifra,
    })
    .then((res) => {
      if (res.data === "Pogresna sifra!") {
        console.log(res.data);
        return alert("Pogresna sifra!");
      } else if (res.data === "Ne postoji ovaj korisnik!") {
        console.log(res.data);
        return alert("Ne postoji ovaj korisnik!");
      } else {
        localStorage.setItem("usertoken", res.data);
        return res.data;
      }
    })
    .catch((err) => console.log("Error: " + err));
};
