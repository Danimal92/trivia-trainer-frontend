import React from "react";
import { useState, useEffect } from "react";
import QuestionComponent from "./QuestionComponent";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
// import Col from "react-bootstrap/Col";
// import {Redirect} from "react-router-dom";

let allQuestions = null;

const Questions = (props) => {
  const [questions, setQuestions] = useState(null);
  const [loaded, setLoaded] = useState(false);

 

  const setTrue = () => {
    setLoaded(true);
  };

  const hideConfigHandler = (e) => {
    e.preventDefault();
    setLoaded(false);
    // setQuestions(null);
    props.toggleHideConfig();
  };

  const style = {
    // borderTop: "4px solid #FFFFFF",
    // borderBottom: "4px solid #FFFFFF",
    // borderLeft: "4px solid #FFFFFF",
    // borderRight: "4px solid #FFFFFF",
    paddingTop: "4px",
    paddingBottom: "8px",
    // backgroundColor: "#E7A24D"
    // backgroundColor: "#E7A24D",
    // height: '3000px', /* Used to enable scrolling */
    // background: 'linear-gradient(55deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 85%)'
  };

  function shuffle(array) {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  //   const quickFunc = () => {
  //     setQuestions(props.currentQuestions)
  //     while(!questions){
  //       console.log("caught in while loop")
  //       setQuestions('props.currentQuestions')
  //     }
  //     if(props.currentQuestions){

  //     while(questions.length !== props.currentQuestions.length){
  //       console.log("not yet")
  //     }
  //     return "ok"
  //   }
  //   }

  //   const questionSet = async () => {

  //     let response = await quickFunc()

  //     if(!response){
  //       throw new Error(`HTTP error! status: ${response}`);
  //     }
  //     else{
  //       setLoaded(true)
  //     }
  // }

  //  const wait = () => new Promise((resolve) => {
  //   questionSet(resolve)
  //   resolve()
  // });

  useEffect(() => {});

  useEffect(() => {
    // setQuestions(props.currentQuestions);
    const displayQuestions = () => {
      if (props.currentQuestions) {
        allQuestions = props.currentQuestions.map((element) => (
          <QuestionComponent
            key={element.question}
            question={element}
            answers={shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ])}
          ></QuestionComponent>
        ));
        setQuestions(allQuestions);
      } else {
        setLoaded(false);
      }
  
      setTimeout(setTrue, 500);
    };

    setLoaded(false);
    if (props.currentQuestions) {
      if (props.currentQuestions.length === 0) {
        alert(
          "Not enough questions of this type, please choose fewer questions"
        );
        // return <Redirect to='/' />
      }
      if (props.currentQuestions.length > 0) {
        displayQuestions();
      }
    }

    return () => {
      setLoaded(false);
      // setQuestions(null);
      allQuestions = null;
    };
  }, [props.currentQuestions]);

  // useEffect(() => {
  //   if (questions) {
  //     if (questions.length > 0) {
  //       setTimeout(displayQuestions, 1000);
  //     }
  //   }

  //   // return () => {
  //   //   setLoaded(false)
  //   //   setQuestions(null)
  //   // }
  // }, [questions]);

  return (
    <>
      {loaded ? (
        <Container style={style}>
          <Container>
            <Row className="justify-content-center">
              <Button
                style={{
                  marginBottom: "8px",
                  position: "fixed",
                  top: "0",
                  // width: '100%',
                  zIndex: "100",
                }}
                variant="dark"
                onClick={(e) => hideConfigHandler(e)}
              >
                Go back
              </Button>
            </Row>

            <Row className="justify-content-center">
              {loaded ? (
                <>{questions}</>
              ) : (
                
                  <Container style={{}}>
                    <Row className="justify-content-center">
                      <Spinner  animation="grow" variant="dark" />
                    </Row>
                  </Container>
                
              )}
            </Row>
          </Container>
        </Container>
      ) : (
        
          <Container >
            <Row className="justify-content-center">
              <Spinner animation="grow" variant="danger" />
            </Row>
          </Container>
        
      )}
    </>
  );
};
export default Questions;
