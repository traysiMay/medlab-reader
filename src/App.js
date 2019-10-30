import React, { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import { Button, ButtonContainer, EmailContainer, EmailLine, SearchInput } from './styles'
const SERVER_ENDPOINT = process.env.NODE_ENV === 'development' ? "http://localhost:4000" : "https://eng.med--lab.org"

// var n = { method: "POST", headers: { Authorization: "Bearer ".concat(s), "Content-Type": "application/json" }, body: JSON.stringify({ qr: t }) };

function App() {
  const searchRef = useRef('')
  const [result, setResult] = useState("");
  const [token, setToken] = useState(localStorage.getItem('ttoken'))
  const [emails, setEmails] = useState([])
  const [matchedEmails, setMatchedEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState("")
  const [searchParam, setSearchParam] = useState("")


  const auth = () => {
    const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "admin" }) }
    fetch(SERVER_ENDPOINT + "/auth/login", options).then(response => response.json()).then(data => {
      setToken(data.token)
      localStorage.setItem('ttoken', data.token)
    })
  }
  const getAll = () => {
    const options = { method: "GET", headers: { Authorization: "Bearer ".concat(token), "Content-Type": "application/json" } };
    fetch(SERVER_ENDPOINT + "/user", options).then(response => response.json()).then(data => {
      console.log(data)
      const { raptors: { choosers } } = data
      const { rsvps: { rsvps } } = data;
      const emails = rsvps.concat(choosers)
      setEmails(emails)
    })
  }
  const selectEmail = () => {

  }
  const boopEmail = () => {
    const options = { method: "POST", headers: { Authorization: "Bearer ".concat(token), "Content-Type": "application/json" }, body: JSON.stringify({ email: selectedEmail.email, raptor: selectedEmail.raptor }) };
    fetch(SERVER_ENDPOINT + '/rsvp/boopemail', options)
      .then(response => response.json())
      .then(data => {
        getAll()
      })
  }

  // const handleInput = (e) => updateSearch(e.target.value)
  const handleInput = (e) => setSearchParam(e.target.value)

  const updateSearch = (search) => {
    if (!search) return setMatchedEmails(emails)
    const matchedEmails = emails.filter(u => u.email.includes(search))
    setMatchedEmails(matchedEmails)
  }

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = err => {
    console.log(err);
  };

  useEffect(() => {
    getAll()
    auth()
  }, [])
  console.log(emails)
  return (
    <div className="App">
      {!token && <Button onClick={auth}>AUTH</Button>}
      {/* <Button onClick={getAll}>GETALL</Button> */}
      <SearchInput placeholder="SEARCH" ref={searchRef} onChange={handleInput} />
      <EmailContainer>
        {emails.map(u => {
          if (u.email.includes(searchParam)) return <EmailLine key={u.email} onClick={(e) => setSelectedEmail({ email: e.target.innerHTML, raptor: e.target.className.split('raptor')[0] })} id={u.email === selectedEmail.email ? 'selected' : ''} className={u.raptorname ? 'raptor rsvp' : 'rsvp'} boop={u.boop ? 'line-through' : ''} >{u.email}</EmailLine>
        })}
      </EmailContainer>
      <ButtonContainer>
        <Button onClick={boopEmail}>CHECKIN</Button>
      </ButtonContainer>
      {/* <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>PAPA-{result}-PAPA</p> */}
    </div>
  );
}

export default App;
