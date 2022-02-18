/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import { emailMessage, signUp } from '../firebase/firebase-auth.js';
import { addUserInfo } from '../firebase/firebase-data.js';

export default () => {
    const viewRegistration = `
    <section id="principalView1">
    <h1 class="nameSocialNetwork">VIAJA PE</h1>
    <img class="logo1" src="img/airplane.png" />
</section>

<section id="principalView2">
    <div class="hidden">
        <img class="logo2" src="img/airplane.png" />
        <h2 class="text slogan">Lo que está pasando ahora ...</h2>
    </div>

    <form id="formRegistration">
        <input type="text" class="registerInput" id="signUp-user" placeholder="&#xf007;  Nombre de usuario" required>
        </input>
        <span id="signUpUserErrorMessage"></span>
        <input type="email" class="registerInput" id="signUp-email" placeholder="&#xf0e0;  Correo electrónico"
            required></input>
        <span id="emailErrorMessage"></span>
        <input type="password" class="registerInput" id="signUp-password" placeholder="&#xf084;  Contraseña"
            required></input>
        <span id="passwordErrorMessage"></span>

        <div id="termsConditions">
            <input type="checkbox" class="checkTerms" id="checkTerms" required </input>
            <label class="textModal">Acepto los <a href="#modal" class="cta"> términos y condicione </a> de las Polìticas de
                Privacidad.</label>
        </div>

        <form id = "formRegistration">
            <input type="text" class="registerInput" id="signUp-user" placeholder="&#xf007;  Nombre de usuario" required> </input>
            <span class="message" id="signUpUserErrorMessage"></span>
            <input type="email" class="registerInput" id="signUp-email" placeholder="&#xf0e0;  Correo electrónico" required></input>
            <span class="message" id="emailErrorMessage"></span>
            <input type="password" class="registerInput" id="signUp-password" placeholder="&#xf084;  Contraseña" required></input>
            <span class="message" id="passwordErrorMessage"></span>
            
            <div id="termsConditions">
                <input type="checkbox" class="checkTerms" id="checkTerms" required </input>
                <label class="text">Acepto los términos y condiciones de las Polìticas de Privacidad.</label>
            </div>

<section id="modal" class="modal">
    <div class="modal_container">
        <header>Términos y Condiciones VIAJA PE</header>
        <a href="#principalView2" class="modal_close">X</a>
        <div class="contenido">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non ex optio ipsum nesciunt aperiam quod
                quisquam illum cupiditate libero, qui illo nihil? Labore molestias minus beatae, necessitatibus
                incidunt voluptatem. Iusto, esse blanditiis! Perspiciatis explicabo possimus ipsum, ratione
                doloribus necessitatibus corporis nemo esse! Earum at labore minima? Asperiores laboriosam harum
                similique dolorum alias quibusdam nobis itaque voluptatem rem labore nulla reprehenderit temporibus
                cumque, voluptatum eveniet quasi provident tempore, neque ullam ipsum. Nostrum laboriosam iste
                repellat qui cum molestiae iusto assumenda accusamus.</p>
        </div>

    </div>
</section>`;

    const viewRegistrationDiv = document.createElement('div');
    viewRegistrationDiv.innerHTML = viewRegistration;
    viewRegistrationDiv.setAttribute('id', 'viewRegistration');
    const signupForm = viewRegistrationDiv.querySelector('#formRegistration');

    // Capturando los campos de entrada
    const signUpUser = viewRegistrationDiv.querySelector('#signUp-user');
    const email = viewRegistrationDiv.querySelector('#signUp-email');
    const password = viewRegistrationDiv.querySelector('#signUp-password');

    // Capturando mensajes de error
    const signUpUserErrorMessage = viewRegistrationDiv.querySelector('#signUpUserErrorMessage');
    const emailErrorMessage = viewRegistrationDiv.querySelector('#emailErrorMessage');
    const passwordErrorMessage = viewRegistrationDiv.querySelector('#passwordErrorMessage');

    // Regex para los campos de formulario
    const userRegex = /^[a-zA-Z0-9\_\-]{2,10}$/;
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}$/;

    // Funcion de validación de campo de nombre de usuario
    function parametersUserInput() {
        if (userRegex.test(signUpUser.value)) {
            signUpUserErrorMessage.innerHTML = '';
        } else {
            signUpUserErrorMessage.innerHTML = 'El usuario debe tener de 2 a 10 dígitos y solo puede contener números, letras y guion bajo';
        }
    }

    // Funcion de validación de campo de email
    function parametersEmailInput() {
        if (emailRegex.test(email.value)) {
            emailErrorMessage.innerHTML = '';
        } else {
            emailErrorMessage.innerHTML = 'Ingrese un correo válido';
        }
    }

    // Funcion de validación de campo de password
    function parametersPasswordInput() {
        if (passwordRegex.test(password.value)) {
            passwordErrorMessage.innerHTML = '';
        } else {
            passwordErrorMessage.innerHTML = 'Min. 6 caracteres y max. 10, debe contener al menos una letra mayuscula, una minuscula, un numero y un caracter especial';
        }
    }

    // Mensajes de validación de campo de nombre de usuario
    signUpUser.addEventListener('input', parametersUserInput);

    // Mensajes de validación de campo de email
    email.addEventListener('input', parametersEmailInput);

    // Mensajes de validación de campo de password
    password.addEventListener('input', parametersPasswordInput);

    // Funcionalidad al boton "Registrarse"
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // previene que se envíe y borre automaticamente 
        const signUpUserValue = viewRegistrationDiv.querySelector('#signUp-user').value;

        signUp(email.value, password.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);

                emailMessage()
                    .then(() => {
                        alert('Verifica tu bandeja de entrada para verificar tu cuenta');
                        window.location.hash = '#/';
                        // Email verification sent!

                        addUserInfo(user.uid, signUpUserValue, email.value); // Añade data a la colección de users al registrarse
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        // signupForm.reset();// limpiar automáticamente campos del formulario  
    });
    return viewRegistrationDiv;
};
