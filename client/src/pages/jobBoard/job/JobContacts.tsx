import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { JobContext } from "../../../context/JobContext";
import { PageContainer } from "../../../styles/styled-components/StyledContainers";
const JobContacts = ({ job, getJob }) => {
  const jobId = job.job_id;

  const [inputs, setInputs] = useState({
    contact_name: "",
    contact_title: "",
    contact_linkedin: "",
    contact_email: "",
    contact_phone: "",
  });
  const [editInputs, setEditInputs] = useState({});
  const [noContact, setNoContact] = useState(true);
  const [addForm, setAddForm] = useState(false);

  useEffect(() => {
    if (job.job_contacts && job.job_contacts.length > 0) {
      setNoContact(false);
    }
  }, [job]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    // console.log(inputs);
  };

  const handleEditChange = (e) => {
    setEditInputs({ [e.target.name]: e.target.value });
    // console.log(editInputs);
  };

  const handleCheckBox = (e, job_id) => {
    handleToggleChecks(e, e.target.id, e.target.checked, job_id);
    getJob();
  };

  const handleToggleChecks = (e, checkKey, checkedState, job_id) => {
    e.preventDefault();
    console.log(checkKey);
    console.log(checkedState);
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/set-contact-sent`,
        {
          job_id,
          checkKey,
          checkedState,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        // props.getJob();
        getJob();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddNewContact = (e, index) => {
    e.preventDefault();
    setAddForm(false);
    let {
      contact_name,
      contact_title,
      contact_linkedin,
      contact_email,
      contact_phone,
    } = inputs;

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
          index,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        // getJobDetail();
        getJob();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditContact = (e, index, job_id) => {
    e.preventDefault();
    let key = String(Object.keys(editInputs));
    let value = String(Object.values(editInputs));
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/edit-contact`,
        {
          key,
          value,
          job_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data.job_contacts);
        getJob();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        getJob();
      })
      .catch((err) => {
        console.log(err);
      });
  }; 

  return (
    <PageContainer>
      <h3>Job Contacts</h3>

      {noContact ? (
        <button onClick={() => setNoContact(false)}>Add Contact</button>
      ) : (
        <div>
          {job.job_contacts && job.job_contacts.length > 0 ? (
            job.job_contacts.map((contact, index) => {
              return (
                <form
                  key={index}
                  onSubmit={(e) => handleEditContact(e, index, contact.job_id)}
                >
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

                  <div>
                    <input
                      type="text"
                      id="contact_linkedin"
                      name="contact_linkedin"
                      placeholder={contact.contact_linkedin || "Linkedin"}
                      onChange={handleEditChange}
                    />
                    <p>Request Sent</p>
                    <input
                      checked={contact.request_check === "true" ? true : false}
                      onChange={(e) => handleCheckBox(e, contact.job_id)}
                      type="checkbox"
                      id="request_check"
                    />

                    <p>Message Sent</p>
                    <input
                      checked={contact.message_check === "true" ? true : false}
                      onChange={(e) => handleCheckBox(e, contact.job_id)}
                      type="checkbox"
                      id="message_check"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      id="contact_email"
                      name="contact_email"
                      placeholder={contact.contact_email || "Email"}
                      onChange={handleEditChange}
                    />
                    <p>Email Sent</p>
                    <input
                      checked={contact.email_check === "true" ? true : false}
                      onChange={(e) => handleCheckBox(e, contact.job_id)}
                      type="checkbox"
                      id="email_check"
                    />
                  </div>
                  <input
                    type="text"
                    id="contact_phone"
                    name="contact_phone"
                    placeholder={contact.contact_phone || "Phone"}
                    onChange={handleEditChange}
                  />
                  <button type="button" onClick={() => removeContact(index)}>
                    Delete Contact
                  </button>
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
            {addForm ? (
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
                <button onClick={() => setAddForm(false)}>Cancel</button>
              </form>
            ) : null}
            <button onClick={() => setAddForm(true)}>
              Add Another Contact
            </button>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default JobContacts;
