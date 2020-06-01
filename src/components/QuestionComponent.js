import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// import InputGroup from "react-bootstrap/InputGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export const QuestionComponent = (props) => {
  const [selection, setSelection] = useState("");
  const [color, setColor] = useState("");
  const [boolean, setBoolean] = useState(null);
  const [alert, setAlert] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const style = {
    paddingBottom: "2px",
    paddingTop: "2px",
  };

  const {
    category,
    type,
    difficulty,
    question,
    correct_answer,
  } = props.question;

  const answers = props.answers;

  let decodedQuestion = decodeHTMLEntities(question);
  let decodedAnswer = decodeHTMLEntities(correct_answer);

  function decodeHTMLEntities(text) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (selection === decodedAnswer) {
      setAlert(false)
      setColor("success");
      setBoolean("Correct!");
      setDisabled(true)
    }
    else if (selection === '') {
      
      setAlert(true)
    }
    else {
      setAlert(false)
      setColor("danger");
      setBoolean("Wrong.");
      setDisabled(true)
    }
  };

  const displayAnswerButtons = () => {
    return answers.map((answer) => (
      <ToggleButton
        key={answer}
        variant="outline-dark"
        type="radio"
        value={answer}
        size="sm"
        onClick={() => setSelection(decodeHTMLEntities(answer))}
        disabled={disabled}
      >
        {decodeHTMLEntities(answer)}
      </ToggleButton>
    ));
  };

  //   function shuffle(array) {
  //     var m = array.length,
  //       t,
  //       i;

  //     while (m) {
  //       i = Math.floor(Math.random() * m--);
  //       t = array[m];
  //       array[m] = array[i];
  //       array[i] = t;
  //     }

  //     return array;
  //   }

  return (
    <>
      <Container>
        <Container style={style}>
          <Row>
            <h6>Category: {category}</h6>
          </Row>
          <Row>
            <h6>Difficulty: {difficulty.toUpperCase()}</h6>
          </Row>
          <Row className="justify-content-md-center">
            <h5>{decodeHTMLEntities(question)}</h5>
          </Row>
          <Row className="justify-content-md-center">
            <ToggleButtonGroup vertical type="radio" name="options">
              {displayAnswerButtons()}
            </ToggleButtonGroup>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            {!boolean ? (
              ""
            ) : (
              <h6>
                {boolean} The answer is {decodedAnswer}
              </h6>
            )}
          </Row>
          <Row className="justify-content-md-center">
            <Button
              onClick={submitHandler}
              disabled={boolean ? true : false}
              variant={color ? color : "secondary"}
              size="sm"
            >
              {!boolean ? "Submit" : ""}
              {boolean === "Correct!" ? "Nice Job!" : ""}
              {boolean === "Wrong." ? "Ouch" : ""}
            </Button>
          </Row>
          {alert ? <Row className='justify-content-md-center' style={{ paddingTop: '8px' }}><Alert variant={'danger'} onClick={() => {setAlert(false)}} dismissible>
    Please make a selection.
  </Alert></Row> : ''}
          
          
        </Container>
        <hr />
      </Container>
    </>
  );
};

export default QuestionComponent;
