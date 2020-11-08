import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../styles/styled-components/StylesCard";

const InfoDiv = ({ state, element, url }) => {
  console.log(element);
  return (
    <Card inner>
      <CardContent inner>
        <h4>{element}</h4>
        {state && state.length > 0 ? (
          state.map((item, index) => {
            return item.completed === false ? (
              <div key={index}>
                {element === "Todos" ? <CardContent>
                <p>{item.content}</p>
                <button>Finish</button>
                <button>Delete</button>
                </CardContent> : null}
                {
                  (element = "Challenges" ? (
                    <>
                      <p>{item.name}</p>
                      <a href={item.url} target="_blank">
                        {item.url}
                      </a>
                    </>
                  ) : null)
                }
                {
                  (element = "Learning" ? (
                    <>
                      <p>{item.name}</p>
                      <a href={item.tutorial_url} target="_blank">
                        {item.tutorial_url}
                      </a>{" "}
                    </>
                  ) : null)
                }
              </div>
            ) : null;
          })
        ) : (
          <div>
            <p>No {element}...</p>
            <Link to={`${url}`}>Add {element}?</Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoDiv;
