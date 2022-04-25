import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,

} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,  doc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHxC8AyLJiIlNn4hYPDaIcEOc1qXnKwCk",
    authDomain: "cybercards-b31db.firebaseapp.com",
    databaseURL: "https://cybercards-b31db-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cybercards-b31db",
    storageBucket: "cybercards-b31db.appspot.com",
    messagingSenderId: "926322052503",
    appId: "1:926322052503:web:51f1946b0233ee69a288d2"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      digitalcard:"DigitalTest"
    });
    
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const pullcardtest = async (FirstName,LastName,Phone,Email,Layout,Address,Website,user) => {
  try {
    var x = await addDoc(collection(db, "digital-card"), {
      "firstName":FirstName,
      "lastName":LastName,
      "phone":Phone,
      "email":Email,
      "Address":Address,
      "Website":Website,
      "layout":Layout,
      "Creator":user?.uid,
      
    });
    const userRef = query(collection(db, "users"), where("uid", "==", user?.uid));
    const findUsers = await getDocs(userRef);
    findUsers.forEach( async (user) => {
     const getUser = doc(db, 'users', user.id);
     await updateDoc(getUser, {
      "DigitalCard":x.id
     });
    });
;
      //Redirects to the card
    var cardpath = '/digitalcard?id='+x.id
    window.location.href = cardpath;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  pullcardtest,
};
