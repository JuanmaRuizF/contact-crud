import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EditContact = () => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);

  var firstName = null;
  var lastName = null;
  var email = null;
  var phoneNumber = null;

  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState(null);

  const load_data = async (id) => {
    const url = `/api/v1/show/${id}`;

    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setContactData(response))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    var url = window.location.href.toString().split("/")[4];
    load_data(url);
  }, []);

  const submitForm = (event) => {
    event.preventDefault();
    var id = window.location.href.toString().split("/")[4];
    const url = `/api/v1/edit/${id}`;

    if (firstName === null || firstName.length === 0) {
      firstName = contactData[0].firstName;
    }
    if (lastName === null || lastName.length === 0) {
      lastName = contactData[0].lastName;
    }
    if (email === null || email.length === 0) {
      email = contactData[0].email;
    }
    if (phoneNumber === null || phoneNumber.length === 0) {
      phoneNumber = contactData[0].phoneNumber;
    }

    const body = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

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
    <div className="">
      {loading ? (
        <>
          <div>Loading</div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">Edit the contact</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={contactData[0].firstName}
                    disabled
                  />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control"
                    required
                    // onChange={(e) => setFirstName(e.target.value)}
                    onChange={(e) => (firstName = e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={contactData[0].lastName}
                    disabled
                  />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-control"
                    required
                    onChange={(e) => (lastName = e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={contactData[0].email}
                    disabled
                  />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                    onChange={(e) => (email = e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={contactData[0].phoneNumber}
                    disabled
                  />
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="form-control"
                    required
                    onChange={(e) => (phoneNumber = e.target.value)}
                  />
                </div>

                <button
                  onClick={(e) => {
                    submitForm(e);
                    // location.replace("http://localhost:3000/contacts");
                  }}
                  className="btn custom-button mt-3"
                >
                  Save changes
                </button>
                <Link to="/contacts" className="btn btn-link mt-3">
                  Back to contact list
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default EditContact;
