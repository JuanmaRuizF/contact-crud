import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EditContact = () => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  var firstName = null;
  var lastName = null;
  var email = null;
  var phoneNumber = null;
  var historyEdits = "";

  const load_data = async (id) => {
    const url = `/api/v1/show/${id}`;

    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network error");
      })
      .then((response) => setContactData(response))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    var url = window.location.href.toString().split("/")[4];
    load_data(url);
  }, []);

  const checkFieldValues = (fieldName, fieldData) => {
    if (fieldData === null || fieldData.length === 0) {
      fieldData = contactData[0][fieldName];
    } else if (fieldData !== contactData[0][fieldName]) {
      if (historyEdits === "") {
        historyEdits = contactData[0].historyEdits;
        historyEdits += contactData[0][fieldName] + "->" + fieldData + " || ";
      } else {
        historyEdits += contactData[0][fieldName] + "->" + fieldData + " || ";
      }
    }
  };

  const emailValidation = async () => {
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
      if (element.email === email && contactData[0].email !== element.email) {
        setErrorMsg("A contact with the same email already exists.");
        emailValidation = false;
      }
    });
    return emailValidation;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    var id = window.location.href.toString().split("/")[4];
    const url = `/api/v1/edit/${id}`;

    if (!(await emailValidation())) {
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
      return;
    }
    checkFieldValues("firstName", firstName);
    checkFieldValues("lastName", lastName);
    checkFieldValues("email", email);
    checkFieldValues("phoneNumber", phoneNumber);
    historyEdits = historyEdits.substring(0, historyEdits.length - 3) + " // ";

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
      historyEdits,
    };

    // const token = document.querySelector('meta[name="csrf-token"]').content;
    return await fetch(url, {
      method: "post",
      headers: {
        // "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      setSuccessMsg("The changes have been successfully applied.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
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
              <div className="error-text">{errorMsg}</div>
              <div className="success-text">{successMsg}</div>
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
                <div className="row">
                  <div className="col-sm">
                    <button
                      onClick={(e) => {
                        submitForm(e);
                        // location.replace("http://localhost:3000/");
                      }}
                      className="btn custom-button mt-3"
                    >
                      Save changes
                    </button>
                  </div>

                  <div className="col-sm text-end mt-3">
                    <Link to="/">Back to contact list</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default EditContact;
