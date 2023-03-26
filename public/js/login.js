const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.parentElement.querySelector('input').style.height='50px !important'
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
});
document.getElementById('login-form-btn').addEventListener('click',async function(e){
    await axios.post('http://localhost:3000/api/auth/signIn', {
        email:document.querySelector('input[name="email"]').value, password:document.querySelector('input[name="password"]').value
      })
      .then(function (response) {
        alert('ok')
        location.href='http://localhost:3000/payement'
      })
      .catch(function (err) {
        var err=err.response.data.errors.email || err.response.data.errors.password
        ErrLog.innerHTML=`<span class="label label-danger" style="font-size:16px">${err}</span>`
      });
})





  document.getElementById('reg-form-btn').addEventListener('click',async function(e){
      await axios.post('http://localhost:3000/api/auth/sigUp', {
          email:document.querySelector('input[name="email"]').value, password:document.querySelector('input[name="password"]').value
        })
        .then(function (response) {
          alert('ok')
          location.href='http://localhost:3000/payement'
        })
        .catch(function (err) {
          var err=err.response.data.errors.email || err.response.data.errors.password
          ErrLog.innerHTML=`<span class="label label-danger" style="font-size:16px">${err}</span>`
        });
  })



