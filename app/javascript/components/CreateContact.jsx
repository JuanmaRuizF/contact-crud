import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateContact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  var historyEdits = "";

  const navigate = useNavigate();

  const validateFormValues = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phoneNumber === ""
    ) {
      setErrorMsg("There are fields bank. All fields are mandatory.");
      return false;
    }
    let data;
    let emailValidation = true;
    await fetch("/api/v1/contacts/index")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network error");
      })
      .then((response) => (data = response));
    data.map((element) => {
      if (element.email === email) {
        setErrorMsg("A contact with the same email already exists.");
        emailValidation = false;
      }
    });

    return emailValidation;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let fetchResult = false;
    const url = "/api/v1/contacts/create";

    if (!(await validateFormValues())) {
      return false;
    }
    const body = {
      firstName,
      lastName,
      email,
      phoneNumber,
      historyEdits,
    };

    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        fetchResult = true;
      }
    });

    return fetchResult;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Add a new contact</h1>
          <form>
            <div className="error-text">{errorMsg}</div>
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
                type="email"
                name="email"
                id="email"
                className="form-control"
                required
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
            <div className="row">
              <div className="col-sm">
                <button
                  onClick={async (e) => {
                    if (await submitForm(e)) {
                      navigate("/");
                    } else {
                      setTimeout(() => {
                        setErrorMsg("");
                      }, 5000);
                    }
                  }}
                  className="btn custom-button mt-3"
                >
                  Create Contact
                </button>
              </div>

              <div className="col-sm text-end">
                <Link to="/" className="btn btn-link mt-3 text-end">
                  Back to contact list
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateContact;
