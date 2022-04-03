import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewContact = (props) => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);
  const [edits, setEdits] = useState(null);

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

  const deleteContact = (e) => {
    var id = window.location.href.toString().split("/")[4];
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
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
          <div className="text-center">
            <h3>First Name: {contactData[0].firstName}</h3>
            <h3>Last Name: {contactData[0].lastName}</h3>
            <h3>Email: {contactData[0].email}</h3>
            <h3>Phone Number: {contactData[0].phoneNumber}</h3>
          </div>
          {contactData[0].historyEdits.length > 0 ? (
            <>
              <h4 className="text-center">History of edits:</h4>
              <div className="text-center">
                {contactData[0].historyEdits
                  .split("//")
                  .map((subElement, index) => {
                    if (subElement.indexOf("||") > 0) {
                      return <div key={index}>{subElement}</div>;
                    } else {
                      return subElement
                        .split("||")
                        .map((secondSubElement, index) => {
                          return <div key={index}>{secondSubElement}</div>;
                        });
                    }
                  })}
              </div>
            </>
          ) : (
            <div></div>
          )}

          <div className="container py-5">
            <div className="col-sm-12 col-lg-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  deleteContact(e);
                  location.replace("http://localhost:3000/contacts");
                }}
              >
                Delete Contact
              </button>
            </div>
          </div>
          <Link to="/contacts" className="btn btn-link">
            Back to contact list
          </Link>
        </>
      )}
    </div>
  );
};
export default ViewContact;
