import React from 'react'
import "../App.css"
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

export default function MatchCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img src="src/assets/red-bg.png" alt="" width="100%" height="500px"/>
                <Card>
                    <Card.Body>
                        <Card.Title>Match 1</Card.Title>
                        <Card.Text>
                            Details about Match 1.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Carousel.Item>
            <Carousel.Item>
                <Card>
                    <Card.Body>
                        <Card.Title>Match 2</Card.Title>
                        <Card.Text>
                            Details about Match 2.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Carousel.Item>
            <Carousel.Item>
                <Card>
                    <Card.Body>
                        <Card.Title>Match 3</Card.Title>
                        <Card.Text>
                            Details about Match 3.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Carousel.Item>
        </Carousel>
    );
}