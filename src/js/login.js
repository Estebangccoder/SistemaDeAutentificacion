// Formulario

const form=document.querySelector("form")

//input

const email = document.querySelector("#email")
const password = document.querySelector("#password")

form.addEventListener("submit", async(event) => {
    event.preventDefault()

    const user= await validateEmail(email);
    if (user===false){
        alert("ese personaje no esta registrado")
    }else{
        if(user.password===password.value){
            alert("bienvenido")

            localStorage.setItem("userOnline",JSON.stringify(user))
            window.location.href="./src/pages/dashboard.html"
        }else{
            alert("La contraseña es incorrecta")
        }
    }



})
//valida que el correo no exista
async function validateEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const data = await response.json() // convertimos de json a JavaScript

    if (data.length > 0) {
        return data[0]
    } else {
        return false
    }


}