/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    auth,
    providerGoogle,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
} from './firebase-initializer.js';

// Registrar usuario con correo y contraseña
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Enviar email de verificacion para creación de cuenta por correo
export const emailMessage = () => sendEmailVerification(auth.currentUser);

// Iniciar sesion con Google
export const signInWithGoogle = () => signInWithPopup(auth, providerGoogle)
    .then((res) => {
        window.location.hash = '#/home';
        const user = res.user;
        const userName = user.displayName;
        const userPhoto = user.photoURL;
        const userId = user.uid;
        console.log(user);
    })
    .catch((rej) => {
        const errorCode = rej.code;
        const errorMessage = rej.message;
        const email = rej.email; // El email está siendo usado
        console.log(rej);
    });

// Iniciar sesion con correo y contraseña
export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        window.location.hash = '#/home';
        console.log('iniciaste sesión con email');
        console.log(user);
    });

// Modificar contraseña
export const changePassword = (email) => sendPasswordResetEmail(auth, email)
    .then(() => console.log('Se envio correo'))
    .catch((error) => console.log(error.code));
