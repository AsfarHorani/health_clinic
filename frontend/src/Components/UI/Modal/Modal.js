import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';




const modal = (props) =>{
let token,date,time;
const handleInput=(e,type)=>{
  if(type==='token')
  {
    token=e.target.value;
    console.log(token)
  }
   else if(type==='date')
  {
    date=e.target.value;
    console.log(token)
  }
  else if(type==='time')
  {
    time=e.target.value;
    console.log(token)
  }
}

let input = null;
if(props.message.type==="token")
{
  input=(  <input 
    id = 'token'
    value={token}
    onChange={(e=>handleInput(e,'token'))}
    type='input' 
    placeholder='Enter token here'
   />)
}else if(props.message.type==="appointment")
{
  input=( <div>
     <input type="date" value={date} onChange={(e=>handleInput(e,'date'))} id="currentDate"/>
  <input type="time" value={time} onChange={(e=>handleInput(e,'time'))} id="currentTime"/>
  </div>)
}







  return ReactDOM.createPortal(
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <div className="modal__content">{props.children}</div>
     {input}
      <div className="modal__actions">
     
        <button
          mode="raised"
          className='Btn'
          onClick={props.message.type==="token"? ()=>props.onAcceptModal(token): ()=>props.onAcceptModal(time,date)}
          disabled={!props.acceptEnabled}
          loading={props.isLoading}
        >
          Okay
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}


export default modal;
