function submitForm(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    
    if(parseInt(document.getElementById("tel_basic").value) != 'NaN') {
        const pseudo = document.getElementById("pseudo_basic").value;
        const numero = parseInt(document.getElementById("tel_basic").value);
        console.log(parseInt(document.getElementById("tel_basic").value));
        alert('Numéro valide');
    } else {
        alert('Numéro Invalide');
    }
    
    // axios.post("http://localhost:3000/api/payement", { pseudo, numero })
    //   .then(response => {
    //     console.log(response);
    //     alert("Formulaire envoyé !");
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     alert("Erreur lors de l'envoi du formulaire.");
    //   });
}