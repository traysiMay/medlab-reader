import React, { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import { Button, ButtonContainer, EmailContainer, EmailLine, Nav, SearchInput } from './styles'
const SERVER_ENDPOINT = process.env.NODE_ENV === 'development' ? "http://localhost:4000" : "https://eng.med--lab.org"

// var n = { method: "POST", headers: { Authorization: "Bearer ".concat(s), "Content-Type": "application/json" }, body: JSON.stringify({ qr: t }) };

function App() {
  const searchRef = useRef('')
  const [view, setView] = useState('search')
  const [result, setResult] = useState("");
  const [token, setToken] = useState("")
  const [emails, setEmails] = useState([])
  const [matchedEmails, setMatchedEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState("")
  const [searchParam, setSearchParam] = useState("")
  const [qrMessage, setQrMessage] = useState("")
  const [messageStatus, setMessageStatus] = useState("")


  const auth = () => {
    const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "reader", password: "reader" }) }
    fetch(SERVER_ENDPOINT + "/auth/login", options).then(response => response.json()).then(data => {
      console.log(data)
      setToken(data.token)
      localStorage.setItem('ttoken', data.token)
    })
  }
  const getAll = () => {
    if (!token) return
    const options = { method: "GET", headers: { Authorization: "Bearer ".concat(token), "Content-Type": "application/json" } };
    fetch(SERVER_ENDPOINT + "/user", options).then(response => response.json()).then(data => {
      console.log(data)
      const { raptors: { choosers } } = data
      const { rsvps: { rsvps } } = data;
      const emails = rsvps.concat(choosers)
      setEmails(emails.sort((a, b) => (a.email > b.email) ? 1 : -1))
    })
  }

  const boopEmail = () => {
    const raptor = selectedEmail.raptor.includes('raptor') ? 'raptor' : ''
    console.log(raptor)
    const options = { method: "POST", headers: { Authorization: "Bearer ".concat(token), "Content-Type": "application/json" }, body: JSON.stringify({ email: selectedEmail.email, raptor }) };
    fetch(SERVER_ENDPOINT + '/rsvp/boopemail', options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        getAll()
      })
  }
  //t14o21a35d?040ca650-fb2e-34db-999d-30613e969f36
  const sendQR = () => {
    console.log('sendQT')
    const options = { method: "POST", headers: { Authorization: "Bearer ".concat(token), "Content-Type": "application/json" }, body: JSON.stringify({ qr: result }) };
    fetch(SERVER_ENDPOINT + '/toad/boop', options)
      .then(response => response.json())
      .then(data => {
        if (data.qrId) {
          setQrMessage('raptor has been successfully checked in :)')
          setMessageStatus('green')
        }
        if (data.data === 'booped') {
          const datetime = `${new Date(data.boopTime).toLocaleTimeString()} - ${new Date(data.boopTime).toDateString()}`
          setQrMessage(`this QR was checked in @ ${datetime}`)
          setMessageStatus('red')
        }
        setResult('')

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
      setQrMessage("")
      setResult(data);
    }
  };

  const handleError = err => {
    console.log(err);
  };

  useEffect(() => {
    auth()
  }, [])

  useEffect(() => {
    getAll()

  }, [token])
  console.log(emails)
  return (
    <div className="App">
      <Nav>
        <div onClick={() => setView('search')}>SEARCH</div>
        <div onClick={() => setView('qr')}>QR READER</div>
      </Nav>
      {view === 'qr' && <div><QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
        <div style={{ textAlign: 'center', width: '80%', margin: 'auto' }}>
          <div style={{ color: messageStatus }}>{qrMessage}</div>
          <p>{result}</p>
          {/* <input onChange={(e) => setResult(e.target.value)} /> */}
          {result && <Button onClick={sendQR}>SENDIT</Button>}
        </div>
      </div>}
      {/* <Button onClick={auth}>AUTH</Button> */}
      {/* <Button onClick={getAll}>GETALL</Button> */}
      {view === 'search' && <div><SearchInput placeholder="SEARCH" ref={searchRef} onChange={handleInput} />
        <EmailContainer>
          {emails.map((u, i) => {
            if (u.email.includes(searchParam)) return <EmailLine key={u.email + i} onClick={(e) => setSelectedEmail({ email: e.target.innerHTML, raptor: e.target.className })} id={u.email === selectedEmail.email ? 'selected' : ''} className={u.raptorname ? 'raptor rsvp' : 'rsvp'} boop={u.boop ? 'line-through' : ''} >{u.email}</EmailLine>
          })}
        </EmailContainer>
        <ButtonContainer>
          <Button onClick={boopEmail}>CHECKIN</Button>
        </ButtonContainer></div>}

    </div>
  );
}

export default App;
