import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { JobContext } from "../../../context/JobContext";
import { PageContainer } from "../../../styles/styled-components/StyledContainers";

import Form from "../../../components/Form"

const JobContacts = ({ job, getJob }) => {
  const [noContact, setNoContact] = useState(true);

  const jobId = job.job_id;

  const inputs = {
    contact_name: "",
    contact_title: "",
    contact_linkedin: "",
    contact_email: "",
    contact_phone: "",
    request_check: false,
    message_check: false,
    email_check: false,
    main_contact: false,
  };

  useEffect(() => {
    if (job.job_contacts && job.job_contacts.length > 0) {
      setNoContact(false);
    } else {
      setNoContact(true);
    }
  }, [job]);

  const handleAddNewContact = (e) => {
    e.preventDefault();
    let {
      contact_name,
      contact_title,
      contact_linkedin,
      contact_email,
      contact_phone,
      request_check,
      message_check,
      email_check,
      main_contact,
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
          request_check,
          message_check,
          email_check,
          main_contact,
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

  const handleEditContact = (e, contact_id) => {
    e.preventDefault();
    let key = e.target.name;
    let value;

    if (
      key === "request_check" ||
      key === "message_check" ||
      key === "email_check" ||
      key === "main_contact"
    ) {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    console.log(key, value, contact_id);
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/edit-contact`,
        {
          key,
          value,
          contact_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
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
        <button
          onClick={(e) => {
            setNoContact(false);
            handleAddNewContact(e);
          }}
        >
          Add Contact
        </button>
      ) : (
        <div>
          {job.job_contacts && job.job_contacts.length > 0
            ? job.job_contacts.map((contact, index) => {
                return (
                  <div key={index}>
                    <p>Main Contact?</p>
                    <input
                      checked={contact.main_contact === "true" ? true : false}
                      onChange={(e) => handleEditContact(e, contact.contact_id)}
                      type="checkbox"
                      id={contact.contact_id}
                      name="main_contact"
                    />

                    <Form
                      noSubmit
                      smallText
                      onChange={handleEditContact}
                      inputs={[
                        {
                          type: "text",
                          id: contact.contact_id,
                          name: "contact_name",
                          value: contact.contact_name,
                          label: "Name",
                        },
                        {
                          type: "text",
                          id: contact.contact_id,
                          name: "contact_title",
                          value: contact.contact_title,

                          label: "Title",
                        },
                        {
                          type: "text",
                          id: contact.contact_id,
                          name: "contact_linkedin",
                          value: contact.contact_linkedin,

                          label: "Linkedin",
                        },
                      ]}
                    />

                   
                    <div>
                      {/* <input
                        type="text"
                        id={contact.contact_id}
                        name="contact_linkedin"
                        placeholder={contact.contact_linkedin || "Linkedin"}
                        onChange={(e) =>
                          handleEditContact(e, contact.contact_id)
                        }
                      /> */}
                      <p>Request Sent</p>
                      <input
                        checked={
                          contact.request_check === "true" ? true : false
                        }
                        onChange={(e) =>
                          handleEditContact(e, contact.contact_id)
                        }
                        type="checkbox"
                        id={contact.contact_id}
                        name="request_check"
                      />

                      <p>Message Sent</p>
                      <input
                        checked={
                          contact.message_check === "true" ? true : false
                        }
                        onChange={(e) =>
                          handleEditContact(e, contact.contact_id)
                        }
                        type="checkbox"
                        id={contact.contact_id}
                        name="message_check"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        id={contact.contact_id}
                        name="contact_email"
                        placeholder={contact.contact_email || "Email"}
                        onChange={(e) =>
                          handleEditContact(e, contact.contact_id)
                        }
                      />
                      <p>Email Sent</p>
                      <input
                        checked={contact.email_check === "true" ? true : false}
                        onChange={(e) =>
                          handleEditContact(e, contact.contact_id)
                        }
                        type="checkbox"
                        id={contact.contact_id}
                        name="email_check"
                      />
                    </div>
                    <input
                      type="text"
                      id={contact.contact_id}
                      name="contact_phone"
                      placeholder={contact.contact_phone || "Phone"}
                      onChange={(e) => handleEditContact(e, contact.contact_id)}
                    />
                    <button type="button" onClick={() => removeContact(index)}>
                      Delete Contact
                    </button>
                  </div>
                );
              })
            : null}
          <div>
            <button onClick={(e) => handleAddNewContact(e)}>
              Add Another Contact
            </button>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default JobContacts;
