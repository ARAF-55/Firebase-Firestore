import { initializeApp } from 'firebase/app';

import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore';

import {
    getAuth, createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyBzGEjnes3D1IjQPFJOs7aKqFQb1cTv56I",
    authDomain: "fir-9-dojo-6de4f.firebaseapp.com",
    projectId: "fir-9-dojo-6de4f",
    storageBucket: "fir-9-dojo-6de4f.appspot.com",
    messagingSenderId: "27750878037",
    appId: "1:27750878037:web:c6c8a7aa10dbc4bc053ddc"
};

// Initialize App
initializeApp(firebaseConfig);

// Initialize Services

const db = getFirestore();
const auth = getAuth();

// Collection ref

const colRef = collection(db, 'Books');

// queries

const q = query(colRef, orderBy('createdAt'));

// get real time collection data

const unsubCol = onSnapshot(q, (snapShot) => {
    let books = [];
    snapShot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
});


const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    }).then(() => {
        addBookForm.reset();
    });
})

// deleting docs
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const docRef = doc(db, 'Books', deleteBookForm.id.value);
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        });
});

const docRef = doc(db, 'Books', 'UmknLafLAPCC4XZztxqK');

const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
});

// update a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const docRef = doc(db, 'Books', updateForm.id.value);
    updateDoc(docRef, {
        title: "Updated title"
    }).then(() => {
        updateForm.reset();
    });
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created: ', cred.user);
            signupForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        })
});

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            //console.log("The user signed out");
        })
        .catch(err => {
            console.log(err.message);
        })
});

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //console.log('user logged in: ', cred.user);
        })
        .catch(err => {
            console.log(err.message);
        })

});

// subscribe to auth changes

const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user);
});


// unsubscribing from changes (auth, db)

const unsubButton = document.querySelector('.unsub');
unsubButton.addEventListener('click', () => {
    console.log('unsubscribing: ');
    unsubCol();
    unsubDoc();
    unsubAuth();
});