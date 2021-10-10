import '../styles/Home.module.css'
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
    cards.push(<div>
      <h1>Encuentra tu imagen</h1>
    </div>)
  } else if (state.result.errors) {
    cards.push(<div>
      <h1>Ha ocurrido un error</h1>
    </div>)
  } else {
    console.log(state.result)
    state.result.map(element => {
      cards.push(< div className="row row-cols-4 row-cols-md-8" >
        <div className="col">
          <div className="card">
            <img src={element.urls.regular} className="card-img-top" alt={element.alt_description} />
          </div>
        </div>
      </div>)
    })
  }

  return <Fragment>
    <div className="input-group mb-3">
      <input onKeyUp={(e) => { setState({ ...state, 'search': e.target.value }) }} type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <button onClick={searchImage} className="btn btn-outline-success" type="button" id="button-addon2">Button</button>
    </div>
    {cards}
  </Fragment>
}
