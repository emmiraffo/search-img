import style from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createApi } from 'unsplash-js';
import React, { Fragment, useState } from "react";


const unsplash = createApi({
  accessKey: 'SjphEuMt6CUb0Aq0500390frbXKFEX6tnDFnu8FxkJA',
});



export default function SearchImage() {
  const [state, setState] = useState({ 'search': '', 'result': null });

  const searchImage = () => {
    unsplash.search.getPhotos({
      query: state.search,
      page: 1,
      perPage: 10,
      //color: 'green',
      orientation: 'portrait',
    }).then(result => {
      setState({ ...state, 'result': result.response.results })
    })
  }

  const cards = []
  if (state.result === null) {
    cards.push(<div className={style.title}>
      <h3></h3>
    </div>)
  } else if (state.result.errors) {
    cards.push(<div>
      <h1>Ha ocurrido un error</h1>
    </div>)
  } else {
    state.result.map(element => {
      cards.push(< div  >
            <img className={style.card}  src={element.urls.regular}  alt={element.alt_description} />
      </div>)
    })
  }

  return <div className={style.body} >
    <div className={style.input}>
      <input onKeyUp={(e) => { setState({ ...state, 'search': e.target.value }) }} type="text" className="form-control" placeholder="Encuentra tu imagen" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <button onClick={searchImage} className="btn btn-success" type="button" id="button-addon2">Buscar</button>
    </div>
    <div className={style.box}>
      {cards}
    </div>
  </div>
}
