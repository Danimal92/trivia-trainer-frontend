import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const About = () => {


    let style = {
        background: "#2B2D42",
        border: '1px solid #ef233c',
        padding: '40px',
        position: 'relative'
    }


    return (
        <Container style={style}>
            <Row className='justify-content-center' >
                    <h5>
                        Inspired by a friend to make questions for trivia night between friends. <br/> This site uses Opentdb to source questions and generate trivia. Enjoy!
                    </h5>
            </Row>
        </Container>
    )
}
 export default About