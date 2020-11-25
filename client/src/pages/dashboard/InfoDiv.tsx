import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../styles/styled-components/StyledContainers";

const InfoDiv = ({ state, element, url }) => {
  return (
    <Card noBorder>
      {/* <h4>{element}</h4> */}
      {state && state.length > 0 ? (
        state.slice(0, 2).map((item, index) => {
          return item.completed === false ? (
            <Card noBorder flex medium noPadding key={index}>
              {
                (element = "Challenges" ? (
                  <>
                    <div>{item.name}</div>
                    <a href={item.url} target="_blank">
                      {item.url}
                    </a>
                  </>
                ) : null)
              }
              {
                (element = "Learning" ? (
                  <>
                    {/* <p>{item.name}</p> */}
                    <a href={item.tutorial_url} target="_blank">
                      {item.tutorial_url}
                    </a>{" "}
                  </>
                ) : null)
              }
            </Card>
          ) : null;
        })
      ) : (
        <div>
          <p>No {element}...</p>
          <Link to={`${url}`}>Add {element}?</Link>
        </div>
      )}
    </Card>
  );
};

export default InfoDiv;
