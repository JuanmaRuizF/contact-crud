// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

// import React from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

// const Hello = props => (
//   <div>Hello {props.name}!</div>
// )

// Hello.defaultProps = {
//   name: 'David'
// }

// Hello.propTypes = {
//   name: PropTypes.string
// }

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <Hello name="React" />,
//     document.body.appendChild(document.createElement('div')),
//   )
// })

import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Contacts from "../components/Contacts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewContact from "../components/ViewContact";
import CreateContact from "../components/CreateContact";
import EditContact from "../components/EditContact";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="*" element={<Contacts />} />
          <Route path="/contact/:id" element={<ViewContact />} />
          <Route path="/create_contact" element={<CreateContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.body.appendChild(document.createElement("div"))
  );
});
