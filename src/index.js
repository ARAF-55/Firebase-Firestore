import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore';

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

// Collection ref

const colRef = collection(db, 'Books');

// queries

const q = query(colRef, orderBy('createdAt'));

// get real time collection data

onSnapshot(q, (snapShot) => {
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

onSnapshot(docRef, (doc) => {
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


