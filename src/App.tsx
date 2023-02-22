import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  //These interface things are something you need to use in typescript. Here I declare what each property is. 
  // I used this link http://json2ts.com/ to change my API object into typescipt. 
  interface Flags{
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  }

  interface Joke{
    error: boolean;
    category: string;
    type: string;
    joke: string;
    setup: string;
    delivery: string;
    flags: Flags;
    id: number;
    safe: boolean;
    lang: string;
  }
  //In the useState I have to take the whole object from the API to declare that joke is all of those things that are in there. I left the strings as empty strings because they're changeable.
  const [funny , setFunny] = useState<Joke>({
    "error": false,
    "category": "",
    "type": "",
    "joke": "",
    "setup": "",
    "delivery": "",
    "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
    },
    "id": -1,
    "safe": true,
    "lang": "en"
    });

  // Here's just an regular React fetch for the API like we've done before. The API is just some random I found of the internet. 
  const getData = async ()=>{
    const joke = await fetch ("https://v2.jokeapi.dev/joke/Any?safe-mode")
    const data = await joke.json();
    console.log(data) 
    setFunny(data)
}
//useEffect so the API runs once
  useEffect(() =>{
    getData();
  },[])

  return (
    <div className="App">
      <h1 className='title'>Want to hear a joke?</h1>
      <div className='container'>
        <p className='oneliner'>{funny.joke}</p>
        <div className='twoliner'>
        <p className='setup'>{funny.setup}</p>
        <p className='delivery'>{funny.delivery}</p>
        </div>
        {/* I wanted the button to refresh the API without refreshing the page, so I used the function above and made an onClick function to run it again */}
        <button className="button" onClick={getData}>Want to hear another one?</button>
      </div>
    </div>
  );
}

export default App;
