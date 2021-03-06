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
    paddingBottom: "8px",
    paddingTop: "8px",
    // outlineStyle: 'solid',
    // outlineColor: '#000000',
    // outlineOffset: '2px',
    marginTop: '4px',
    backgroundColor: "#2B2D42",
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
        variant="info"
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
      <Container style={style}>
        <Container >
          <Row>
            <h6 style={{color: '#ef233c'}}>Category: {category}</h6>
          </Row>
          <Row>
            <h6>Difficulty: {difficulty.toUpperCase()}</h6>
          </Row>
          <Row className="justify-content-center">
            <h5>{decodeHTMLEntities(question)}</h5>
          </Row>
          <Row className="justify-content-center">
            <ToggleButtonGroup vertical type="radio" name="options">
              {displayAnswerButtons()}
            </ToggleButtonGroup>
          </Row>
          <br />
          <Row className="justify-content-center">
            {!boolean ? (
              ""
            ) : (
              <h6>
                {boolean} The answer is {decodedAnswer}
              </h6>
            )}
          </Row>
          <Row className="justify-content-center">
            <Button
              onClick={submitHandler}
              disabled={boolean ? true : false}
              variant={color ? color : "light"}
              size="sm"
            >
              {!boolean ? "Submit" : ""}
              {boolean === "Correct!" ? "Nice Job!" : ""}
              {boolean === "Wrong." ? "Ouch" : ""}
            </Button>
          </Row>
          {alert ? <Row className='justify-content-center' style={{ paddingTop: '8px' }}><Alert variant={'danger'} onClick={() => {setAlert(false)}} dismissible>
    Please make a selection.
  </Alert></Row> : ''}
          
          
        </Container>
      
      </Container>
    </>
  );
};

export default QuestionComponent;
