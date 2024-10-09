import React from 'react';



export default function Player({name, setplayername, number}){

  function handleName(name){
    setplayername(name)
  }

    return (
    <div className="input-group mb-3">
  <input type="text" className="form-control" onChange={(name) => handleName(name.target.value)} value={name} aria-label="player 1" aria-describedby="player name"/>
</div>);
}