import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewContact = () => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);
  const navigate = useNavigate();

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
    // Calls a fetch method to load data specifically from the id of the user. This id is displayed in the page routing: http://localhost:3000/contact/1
    // so it is extracted from the window location to pass it to the method.
    var id_number = window.location.href.toString().split("/")[4];
    load_data(id_number);
  }, []);

  const deleteContact = () => {
    //selects the id of the element to be deleted, and makes a POST request to delete that contact.
    var id = window.location.href.toString().split("/")[4];
    const url = `/api/v1/destroy/${id}`;

    fetch(url, {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network error");
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
          <div className="container mt-5 border">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <div className="text-center mt-5">
                <h3>Contact data</h3>

                <h5>First Name: {contactData[0].firstName}</h5>
                <h5>Last Name: {contactData[0].lastName}</h5>
                <h5>Email: {contactData[0].email}</h5>
                <h5>Phone Number: {contactData[0].phoneNumber}</h5>
              </div>
              <hr />
              <h3 className="text-center">History of edits</h3>
              {contactData[0].historyEdits.length > 0 ? (
                <>
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
                <div className="text-center">
                  This contact has not been edited yet
                </div>
              )}
              <hr />
              <div className="container py-5">
                <div className="row">
                  <div className="col-sm">
                    <Link
                      to={`/edit/${
                        window.location.href.toString().split("/")[4]
                      }`}
                      className="btn custom-button"
                    >
                      Edit Contact
                    </Link>
                  </div>

                  <div className="col-sm text-end">
                    <button
                      className="btn delete"
                      onClick={(e) => {
                        deleteContact(e);
                        navigate("/");
                      }}
                    >
                      Delete Contact
                    </button>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-sm">
                    <Link to="/">Back to contact list</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ViewContact;
