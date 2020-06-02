import React from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
// import Navbar from "react-bootstrap/Navbar"
import {BrowserRouter as Router,Route,Redirect,Switch} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Layout from "./components/Layout";
import Container from 'react-bootstrap/Container'
// import background from "/Users/flatironschool/Desktop/Trivia remake/trivia-frontend/src/images/gradient_background.jpg";

export class App extends React.Component {

  state = {
    categories: [],
    currentCategory: '',
    currentQuestions: null,
    alert: false
  }

  style = {
    // backgroundImage: `url(${background})`
    // backgroundColor: "#fff7f9"
    // borderLeft:"10px solid #FFFFFF",borderTop:"10px solid #FFFFFF"
    fontFamily: 'Archivo',
    background: '#000000'
  }

  getCategories = () => {
    fetch(`https://still-sands-23635.herokuapp.com/get_categories/`)
    .then(data => data.json())
    .then(data => this.setCategories(data.trivia_categories))
  }

   setCategories = (categoriesArray) => {
    let categoriesObject = []
    for(let i = 0; i < categoriesArray.length; i++){
      categoriesObject.push(categoriesArray[i])
    }
    this.setState({
      categories: categoriesObject
    })
  }

  getQuestions = (element) => {
    this.setState({
      currentCategory: element.category,
      alert: false
    })
    fetch(`https://still-sands-23635.herokuapp.com/get_questions`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json"
      },
      body: JSON.stringify({
        category: element.category,
        amount: element.amount,
        type: element.type,
        difficulty: element.difficulty
      })
    })
    .then(data => data.json())
    .then(data => this.setQuestions(data.results))
  }

  setQuestions = (questionsArray) => {
    if(questionsArray.length === 0){
      
      this.setState({
        alert: true
      })
      
    }
    else{
    this.setState({
      currentQuestions: [...questionsArray]
    })
  }
  }

  clearCategory = () => {
    this.setState({
      currentCategory: ''
    })
  }

  clearQuestions = () => {
    this.setState({
      currentQuestions: ''
    })
  }

  setCategory = (category) => {
    this.setState({
      currentCategory: category
    })
  }

  toggleAlert = () => {
    this.setState({alert: !this.state.alert})      
}
  

  componentDidMount = () => {
    this.getCategories()
  }



  render() {
    
    return (
        
      <div style={this.style}>
        <NavBar></NavBar>
        <Layout >
          <Router>
            <Switch>
              <Route exact path="/" render={props => (
              <Home
                {...props}
                toggleAlert={this.toggleAlert}
                alert={this.state.alert}
                getQuestions={this.getQuestions}
                categories={this.state.categories}
                currentCategory={this.state.currentCategory}
                currentQuestions={this.state.currentQuestions}
                setCategory={this.setCategory}
              />
            )} />
              <Route path="/about" component={About} />
              <Route />
              <Route />
            </Switch>
          </Router>
        </Layout>
        
      </div>
    );
  }
}

export default App;
