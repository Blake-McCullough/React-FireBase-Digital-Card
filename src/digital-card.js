import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { useSearchParams } from 'react-router-dom'
import "./digital-card.css"
const baseurl =
  "https://firestore.googleapis.com/v1/projects/cybercards-b31db/databases/(default)/documents/digital-card/";

function Digitalcard() {
  const [dataState, setDataState] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userQuerySearch, setUserQuerySearch] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("id")  
  var hidden = false
  const handleDataFetch = (query) => {
    
    setUserQuerySearch(query);

  };


  useEffect(() => {
    if (userQuerySearch) {
      dataFetcher();
      
    }
    console.log(dataState);
  }, [dataState, userQuerySearch]);
  useEffect(() => {
    (async function AutoRun() {
      handleDataFetch(searchParams);
    })();
    }, []);
  const dataFetcher = () => {
    try {
      var e = ""+userQuerySearch
      const url = baseurl +e.slice(3)


      fetch(url)
        .then((response) => response.json())
        .then((json) => setDataState(json));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>{dataState && <Presentational data={dataState} />}</div>
    </div>
  );
}


const Presentational = (data) => {
  
  const {firstName,lastName,email,phone,layout,Address,Website} = data.data.fields;
  const fullName = firstName.stringValue
  console.log(data.data.fields.firstName.stringValue)
  var layoutStyle =layout.stringValue

  
  if (layoutStyle === "1") {
    return  <html><head><style>

  </style>
  </head>
  <body>

    <div class="front-side">
        <div class="color-grid">
            <div class="black"></div>
            <div class="red1"></div>
            <div class="red2"></div>
            <div class="green"></div>
        </div>
        <div class="info-grid">
            <div class="firstName">
                <h2>{!!(firstName.stringValue)?firstName.stringValue:" "}</h2>
            </div>
            <div class="lastName">
                <h2>{!!(lastName.stringValue)?lastName.stringValue:" "}</h2>
            </div>
            <div class="addr">
                
                <p>{!!(Address.stringValue)?Address.stringValue:" "}</p>
            </div>
            <div class="phoneNo">
               
                <p>{!!(phone.stringValue)?phone.stringValue:" "}</p>
            </div>
            <div class="emailId">
              
                  <p class="email">{!!(Website.stringValue)?Website.stringValue:" "}</p>
                <p class="web">
                {!!(email.stringValue)?email.stringValue:" "}
                </p>
            </div>
        </div>
    </div>
    
</body></html>
    
  }


  if (layoutStyle === "2") {
    return (
      <div className="login">
        <div className="login__container">
        <div>Second Layout</div>;
        <div>{data && data.data.fields.firstName.stringValue}</div>
        <div>{data && data.data.fields.lastName.stringValue}</div>
        <div>{data && data.data.fields.email.stringValue}</div>
        <div>{data && data.data.fields.phone.stringValue}</div>
        <div>{data && data.data.fields.layout.stringValue}</div>

        </div>
  
      </div>
   
    );
  }
const Presentationa2 = (data) => {
    console.log(data.data.fields.firstName.stringValue);
    const {firstName,lastName,email,phone,layout} = data.data.fields;
    return (
      <div className="login">
        <div className="login__container">
          <div>hello youheheheheh</div>
          <div>{data && firstName.stringValue}</div>
          <div>{data && lastName.stringValue}</div>
          <div>{data && email.stringValue}</div>
          <div>{data && phone.stringValue}</div>
          <div>{data && layout.stringValue}</div>
        </div>
  
      </div>
    );
  };
}



export default Digitalcard;