import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";

const JobContacts = (props) => {
  const [inputs, setInputs] = useState({
    contact_name: "",
    contact_title: "",
    contact_linkedin: "",
    contact_email: "",
    contact_phone: "",
  });
  const [editInputs, setEditInputs] = useState({});
  const [noContact, setNoContact] = useState(true);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    // console.log(inputs);
  };

  const handleEditChange = (e) => {
    setEditInputs({ [e.target.name]: e.target.value });
    console.log(editInputs);
  }

  useEffect(() => {
    if (props.job_contacts.length > 0) {
      setNoContact(false);
    }
  });

  const handleAddNewContact = (e, index) => {
    e.preventDefault();
    let jobId = props.job_id;
    let {
      contact_name,
      contact_title,
      contact_linkedin,
      contact_email,
      contact_phone,
    } = inputs;
    console.log(
      contact_name,
      contact_title,
      contact_linkedin,
      contact_email,
      contact_phone
    );
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/add-contact`,
        {
            contact_name,
            contact_title,
            contact_linkedin,
            contact_email,
            contact_phone,
            jobId,
            index
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditContact = (e, index, job_id) => {
    e.preventDefault();
    let key = String(Object.keys(editInputs));
    let value = String(Object.values(editInputs));
    console.log(job_id)
    axios
    .post(
      `${config.API_URL}/job-board/job-detail/edit-contact`,
      {
          key,
          value,
          job_id,
          index
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }

  const removeContact = (index) => {
    console.log(index);
    
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/delete-contact`,
        {
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Job Contacts</h3>

      {props.job_contacts
        ? props.job_contacts.map((contact, index) => {
            return (
              <div>
                <p>{contact.contact_name}</p>
                <button onClick={() => removeContact(index)}>X</button>
              </div>
            );
          })
        : null}

      {noContact ? (
        <button onClick={() => setNoContact(false)}>Add Contact</button>
      ) : (
        <div>
          {props.job_contacts.length > 0 ? (
            props.job_contacts.map((contact, index) => {
              return (
                <form onSubmit={(e) => handleEditContact(e, index,contact.job_id)}>
                  <input
                    type="text"
                    id="contact_name"
                    name="contact_name"
                    placeholder={contact.contact_name || "Name"}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    id="contact_title"
                    name="contact_title"
                    placeholder={contact.contact_title || "Title"}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    id="contact_linkedin"
                    name="contact_linkedin"
                    placeholder={contact.contact_linkedin || "Linkedin"}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    id="contact_email"
                    name="contact_email"
                    placeholder={contact.contact_email || "Email"}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    id="contact_phone"
                    name="contact_phone"
                    placeholder={contact.contact_phone || "Phone"}
                    onChange={handleEditChange}
                  />
                  <input type="submit" value="Edit Contact" />
                </form>
              );
            })
          ) : (
            <form onSubmit={(e) => handleAddNewContact(e, null)}>
              <input
                type="text"
                id="contact_name"
                name="contact_name"
                placeholder="Name"
                onChange={handleChange}
              />
              <input
                type="text"
                id="contact_title"
                name="contact_title"
                placeholder="Title"
                onChange={handleChange}
              />
              <input
                type="text"
                id="contact_linkedin"
                name="contact_linkedin"
                placeholder="Likedin"
                onChange={handleChange}
              />
              <input
                type="text"
                id="contact_email"
                name="contact_email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                placeholder="Phone"
                onChange={handleChange}
              />
              <input type="submit" value="Save Contact" />
            </form>
          )}
          <div>
            <button>Add Another Contact</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobContacts;
