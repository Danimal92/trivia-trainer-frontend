import React, { useState, useEffect } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Questions from "./components/Questions";
import Alert from "react-bootstrap/Alert";
// import Tooltip from "react-bootstrap/Tooltip";

const Home = (props) => {
  const [amountString, setAmount] = useState(25);
  const [categoryString, setCategory] = useState("");
  const [difficultyString, setDifficulty] = useState("");
  const [typeString, setType] = useState("");
  const [typeStringVisual, setTypeStringVisual] = useState("");
  const [categoryID, setCategoryID] = useState("");
  // const [updateQuestions, setUpdateQuestions] = useState(false);
  const [hideConfig, setHideConfig] = useState(false);

  let style = {
    // borderTop: "solid 1px rgba(0,0,0,0.5)",
    // borderBottom: "solid 1px rgba(0,0,0,0.5)",
    // borderLeft: "solid 1px rgba(0,0,0,0.5)",
    // borderRight: "solid 1px rgba(0,0,0,0.5)",
    paddingTop: "4px",
    paddingBottom: "8px",
    background: "#E7A24D",
    // background: ""
    
  };

  const createParametersObject = () => {
    let object = {};
    object.category = categoryID.toString();
    object.amount = amountString.toString();
    object.type = typeString;
    object.difficulty = difficultyString.toLowerCase();
    return object;
  };

  const generateQuestionsHandler = (e) => {
    e.preventDefault();
    props.getQuestions(createParametersObject());
    // setUpdateQuestions(true);
    setHideConfig(true);
  };

  const categoryDropdownClickHelper = (cat) => {
    props.setCategory(cat);
    setCategory(cat);
  };

  const amountDropdownClickHelper = (num) => {
    setAmount(num);
  };

  const dropdownLinks = (array) => {
    return array.map((element) => (
      <Dropdown.Item
        key={element.id}
        onClick={() => {
          setCategoryID(element.id);
          categoryDropdownClickHelper(element.name);
        }}
      >
        {element.name}
      </Dropdown.Item>
    ));
  };

  const amountDropdowns = () => {
    for (let i = 1; i > 50; i++) {
      return (
        <Dropdown.Item
          key={i}
          onClick={() => {
            amountDropdownClickHelper(i);
          }}
        >
          {i}
        </Dropdown.Item>
      );
    }
  };

  const toggleHideConfig = () => {
    setHideConfig(!hideConfig);
  };

  const toggleAlertHandler = () => {
    props.toggleAlert();
  };

  // const checkHideConfig = () => {
  //   if(props.alert === true)
  // }

  //   const checkCategory = (category) => {
  //     if (category.length) {
  //       return <h2>{category}</h2>;
  //     }
  //   };

  //   const directionTitle = (category) => {
  //     if (!category.length) {
  //       return <h2>choose a category</h2>;
  //     }
  //   };

  useEffect(() => {
    if (props.alert === true) {
      setHideConfig(false);
    }

    // if(props.alert === false && props.currentQuestions){
    //   setHideConfig(true)
    // }

    return () => {
      // setHideConfig(false)
    };
  }, [props.alert]);

  useEffect(() => {
    if (
      props.alert === false &&
      props.currentQuestions &&
      props.currentQuestions.length
    ) {
      setHideConfig(true);
    }

    return () => {};
  }, [props.currentQuestions]);

  return (
    <div >
      {!hideConfig ? (
        <Container  style={style}>
          <Container>
            <Container>
              {props.alert ? (
                <Alert
                  variant={"danger"}
                  onClick={() => {
                    toggleAlertHandler();
                  }}
                  dismissible
                >
                  Not enough questions of this type, please choose a lower
                  amount or change the settings.
                </Alert>
              ) : (
                ""
              )}
              <Row className="justify-content-center" noGutters>
                <h1 style={{fontWeight: 'bold'}}>Pick your questions </h1>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <h6>Choose a category</h6>
                </Col>
                <Col>
                  <Dropdown drop={"right"}>
                    <Dropdown.Toggle
                      size="sm"
                      variant="info"
                      id="dropdown-basic"
                      
                    >
                      {categoryString.length ? categoryString : "Random"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        key={"random"}
                        onClick={() => {
                          setCategory("");
                          setCategoryID("");
                        }}
                      >
                        Random
                      </Dropdown.Item>
                      {dropdownLinks(props.categories)}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Container>
            <hr />
            <Container>
              <Row>
                <Col lg={5} md={4} sm={4}>
                  <Form>
                    <Form.Group controlId="formBasicRangeCustom">
                      <Form.Label>
                        <h6>Choose the amount of questions</h6>
                      </Form.Label>
                      <Form.Control
                        type="range"
                        min="1"
                        max="50"
                        value={amountString}
                        onChange={(changeEvent) =>
                          setAmount(changeEvent.target.value)
                        }
                        custom
                      />
                      <Badge variant="light">{amountString}</Badge>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
            <hr />
            <Container>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <h6>Choose a difficulty</h6>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      size="sm"
                      variant="info"
                      id="dropdown-basic"
                    >
                      {difficultyString.length ? difficultyString : "Random"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        key={"random"}
                        onClick={() => {
                          setDifficulty("");
                        }}
                      >
                        Random
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"easy"}
                        onClick={() => {
                          setDifficulty("Easy");
                        }}
                      >
                        Easy
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"medium"}
                        onClick={() => {
                          setDifficulty("Medium");
                        }}
                      >
                        Medium
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"hard"}
                        onClick={() => {
                          setDifficulty("Hard");
                        }}
                      >
                        Hard
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Container>
            <hr />
            <Container>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <h6>Choose a type</h6>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      size="sm"
                      variant="info"
                      id="dropdown-basic"
                    >
                      {typeString.length ? typeStringVisual : "Random"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        key={"random"}
                        onClick={() => {
                          setType("");
                          setTypeStringVisual("Random");
                        }}
                      >
                        Random
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"medium"}
                        onClick={() => {
                          setType("multiple");
                          setTypeStringVisual("Multiple Choice");
                        }}
                      >
                        Multiple choice
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"hard"}
                        onClick={() => {
                          setType("boolean");
                          setTypeStringVisual("True/False");
                        }}
                      >
                        True/False
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container>
            <Container>
              <Row noGutters className='justify-content-center'>
                
                  <Button
                    style={{ marginTop: "40px" }}
                    size="sm"
                    variant="dark"
                    onClick={generateQuestionsHandler}
                  >
                    Generate questions
                  </Button>
               
                
              </Row>
              <hr />
            </Container>
          </Container>
        </Container>
      ) : (
        <Questions
          toggleHideConfig={toggleHideConfig}
          currentQuestions={props.currentQuestions}
        />
      )}
    </div>
  );
};

export default Home;
