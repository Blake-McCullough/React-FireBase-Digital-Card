import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout,pullcardtest } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Website, setWebsite] = useState("");
  const [Address, setAddress] = useState("");
  const [Layout, setLayout] = useState("");
  const navigate = useNavigate();
  const CreateNewCard = () => {
    if (!FirstName) alert("Please enter first name");
    if (!LastName) alert("Please enter last name");
    if (!Phone) alert("Please enter phone");
    if (!Email) alert("Please enter email");
    if (!Address) setAddress(" ");
    if (!Website) setWebsite("Null");
    if (!Layout) alert("Please select a layout");
    else pullcardtest(FirstName,LastName,Phone,Email,Layout,Address,Website,user)

  };
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div>
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
<br></br>
<div>Create a New card!</div>
<div></div>

      <input
        type="text"
        className="createcard__textBox"
        value={FirstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <div></div>
      <input
        type="text"
        className="createcard__textBox"
        value={LastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <div></div>
      <input
        type="text"
        className="createcard__textBox"
        value={Phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <div></div>
      <input
        type="text"
        className="createcard__textBox"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <div></div>
      <input
        type="text"
        className="createcard__textBox"
        value={Website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
      />
      <div></div>
      <input
        type="text"
        className="createcard__textBox"
        value={Address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <div></div>
      <input
        type="text"
        className="createcard__textBox"
        value={Layout}
        onChange={(e) => setLayout(e.target.value)}
        placeholder="Layout"
      />
      <div></div>
      <button

        className="login__btn"
        onClick={() => CreateNewCard()}
      >
        Create card
      </button>
    </div>
  </div>
   </div>
  );
}

export default Dashboard;
