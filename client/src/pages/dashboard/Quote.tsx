import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card } from "../../styles/styled-components/StyledContainers";

const Quote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    getQuote();
  }, []);
  useEffect(() => {
    console.log(quote);
  }, [quote]);

  const getQuote = () => {
    axios.get("https://type.fit/api/quotes").then((res) => {
      var quote = res.data[Math.floor(Math.random() * res.data.length)];
      setQuote(quote.text);
    });
  };

  return (
    <Card noBorder>
      <p>
        <strong>Inspirational freakin quote: </strong> {quote}
      </p>
    </Card>
  );
};

export default Quote;
