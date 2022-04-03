import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contacts = (props) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  var data;

  const load_data = async () => {
    const url = "/api/v1/contacts/index";
    // const url = "https://some-random-api.ml/facts/dog";
    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setContacts(response))
      .then(() => setLoading(false));
  };
  useEffect(() => {
    load_data();
  }, []);

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Contact List</h1>
          <p className="lead text-muted">Texto</p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
            <Link to="/create_contact" className="btn custom-button">
              Create New Contact
            </Link>
          </div>
          <div className="row">
            {loading ? (
              <div>Loading</div>
            ) : (
              <>
                {contacts.map((contact, index) => {
                  return (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="card mb-4">
                        <div className="card-body">
                          <h5 className="card-title">{contact.firstName}</h5>
                          <h5 className="card-title">{contact.lastName}</h5>
                          <h5 className="card-title">{contact.email}</h5>
                          <h5 className="card-title">{contact.phoneNumber}</h5>
                          <Link
                            to={`/contact/${contact.id}`}
                            className="btn custom-button"
                          >
                            View Contact
                          </Link>
                          <Link
                            to={`/edit/${contact.id}`}
                            className="btn custom-button"
                          >
                            Edit Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};
export default Contacts;
