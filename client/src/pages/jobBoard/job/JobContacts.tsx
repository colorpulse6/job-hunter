import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { JobContext } from "../../../context/JobContext";
import {
  PageContainer,
  Flex,
} from "../../../styles/styled-components/StyledContainers";

import Form from "../../../components/Form";
import { TinyText } from "../../../styles/styled-components/StyledText";
import { StyledButton } from "../../../styles/styled-components/StyledElements";

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
      <Flex center>
        {noContact ? (
          <StyledButton
            onClick={(e) => {
              setNoContact(false);
              handleAddNewContact(e);
            }}
            style={{marginTop:"45px"}}
          >
            Add Contact
          </StyledButton>
        ) : (
          <div>
            {job.job_contacts && job.job_contacts.length > 0
              ? job.job_contacts.map((contact, index) => {
                  return (
                    <div key={index}>
                      <Flex>
                        <Flex spaceAround style={{ width: "160px" }}>
                          <p>Main Contact?</p>
                          <input
                            style={{ marginTop: "19px" }}
                            checked={
                              contact.main_contact === "true" ? true : false
                            }
                            onChange={(e) =>
                              handleEditContact(e, contact.contact_id)
                            }
                            type="checkbox"
                            id={contact.contact_id}
                            name="main_contact"
                          />
                        </Flex>
                        <StyledButton
                        warning
                        small
                          type="button"
                          onClick={() => removeContact(index)}
                        >
                          Delete Contact
                        </StyledButton>
                      </Flex>

                      <Form
                        noSubmit
                        smallText
                        stretchInput
                        onChange={handleEditContact}
                        inputs={[
                          {
                            type: "text",
                            id: contact.contact_id,
                            name: "contact_name",
                            value: contact.contact_name,
                            label: "Name",
                            required: true,
                          },
                          {
                            type: "text",
                            id: contact.contact_id,
                            name: "contact_title",
                            value: contact.contact_title,
                            label: "Title",
                            required: true,
                          },
                          {
                            type: "text",
                            id: contact.contact_id,
                            name: "contact_linkedin",
                            value: contact.contact_linkedin,
                            label: "Linkedin",
                            required: true,
                          },
                          {
                            type: "text",
                            id: contact.contact_id,
                            name: "contact_email",
                            value: contact.contact_email,
                            label: "Email",
                            required: true,
                          },
                          {
                            type: "text",
                            id: contact.contact_id,
                            name: "contact_phone",
                            value: contact.contact_phone,
                            label: "Number",
                            required: true,
                          },
                        ]}
                      />

                      <Flex
                        column
                        flexEnd
                        style={{
                          width: "300px",
                          position: "relative",
                          left: "650px",
                          bottom: "89px",
                        }}
                      >
                        <Flex spaceAround style={{ width: "120px" }}>
                          <TinyText style={{ marginRight: "1.5px" }}>
                            Request Sent
                          </TinyText>
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
                        </Flex>
                        <Flex spaceAround style={{ width: "120px" }}>
                          <TinyText>Message Sent</TinyText>
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
                        </Flex>
                      </Flex>

                      <Flex
                        flexEnd
                        style={{
                          width: "300px",
                          position: "relative",
                          left: "463px",
                          bottom: "50px",
                        }}
                      >
                        <TinyText style={{ marginRight: "30px" }}>
                          Email Sent
                        </TinyText>
                        <input
                          checked={
                            contact.email_check === "true" ? true : false
                          }
                          onChange={(e) =>
                            handleEditContact(e, contact.contact_id)
                          }
                          type="checkbox"
                          id={contact.contact_id}
                          name="email_check"
                        />
                      </Flex>
                    </div>
                  );
                })
              : null}
            <div>
              <StyledButton onClick={(e) => handleAddNewContact(e)}>
                Add Another Contact
              </StyledButton>
            </div>
          </div>
        )}
      </Flex>
    </PageContainer>
  );
};

export default JobContacts;
