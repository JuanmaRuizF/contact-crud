import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CreateContact = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    const url = "/api/v1/contacts/create";

    const body = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    console.log(JSON.stringify(body));
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "post",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Add a new contact</h1>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                required
                pattern="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                className="form-control"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <button
              onClick={(e) => {
                submitForm(e);
                // location.replace("http://localhost:3000/contacts");
              }}
              className="btn custom-button mt-3"
            >
              Create Contact
            </button>
            <Link to="/contacts" className="btn btn-link mt-3">
              Back to contact list
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateContact;
