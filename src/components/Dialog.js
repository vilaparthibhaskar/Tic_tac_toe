import React from "react"

export default function Dialog({text, handledialog}){


    return (
        <div className="fw-bold">
        <button onClick={handledialog} type="button" className="btn btn-danger" style={{ float: 'right' }}>close</button>
        <br></br>
        <p className="mt-3 ms-5">{text}</p>
        </div>
    );
}