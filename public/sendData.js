function payement(event) {
  event.preventDefault(); // Empêche le comportement par défaut du formulaire

  const nom = document.getElementById("name_payement").value;
  const numero = parseInt(document.getElementById("number_payement").value);
  const random_id = Math.random().toString(16).slice(2);
  const datas = {
    reference: nom,
    subscriber: {
      country: "MG",
      currency: "MGA",
      msisdn: numero,
    },
    transaction: {
      amount: 10000,
      country: "MG",
      currency: "MGA",
      id: random_id,
    },
  };
  console.log(datas);
  axios
    .post("http://localhost:3000/api/payement", { datas })
    .then((response) => {
      console.log(response);
      alert("Vous avez effectuer un abonnement mensuel de 10.000 Ar ! Veillez valider votre paiement sur votre mobile dès maintenant");
      window.location.replace("http://localhost:3000/");
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur lors de l'envoi du formulaire.");
    });
}
