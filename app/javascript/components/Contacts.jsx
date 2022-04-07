import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load_data = async () => {
    //Gets contact data so it can be mapped into individual cards in the render method.
    const url = "/api/v1/contacts/index";
    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network error");
      })
      .then((response) => setContacts(response))
      .then(() => setLoading(false));
  };
  useEffect(() => {
    load_data();
  }, []);

  const deleteContact = (e, index) => {
    //Makes a POST request to destroy an element given its id.
    const url = `/api/v1/destroy/${index}`;
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
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-4">
          <h1 className="display-4">Contact List</h1>
          <p className="lead text-muted">
            A CRUD for contacts in React + Ruby on Rails
          </p>
        </div>
        <div className="container">
          <hr />
        </div>
      </section>
      <div className="py-4">
        <main className="container">
          <div className="text-right mb-3 text-center">
            <Link to="/create_contact" className="btn main">
              Create New Contact
            </Link>
          </div>
          <div className="row">
            {loading ? (
              <div>Loading</div>
            ) : (
              <>
                {/* Each contact is mapped into its individual card where it displays some information and links to other actions (delete, edit, view) */}
                {contacts.map((contact, index) => {
                  return (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="card mb-4">
                        <div className="card-body">
                          <h4 className="card-title text-center">
                            {contact.firstName} {contact.lastName}
                          </h4>
                          <h6 className="card-title text-center">
                            {contact.email}
                          </h6>
                          <h4 className="card-title text-center">Actions:</h4>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item text-center">
                              <Link
                                to={`/contact/${contact.id}`}
                                className="btn custom-button"
                              >
                                View Contact
                              </Link>
                            </li>
                            <li className="list-group-item text-center">
                              <Link
                                to={`/edit/${contact.id}`}
                                className="btn custom-button"
                              >
                                Edit Contact
                              </Link>
                            </li>
                            <li className="list-group-item text-center">
                              <button
                                className="btn delete"
                                onClick={(e) => {
                                  deleteContact(e, contact.id);
                                  navigate(0);
                                }}
                              >
                                Delete Contact
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
export default Contacts;
