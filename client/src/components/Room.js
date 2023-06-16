import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel'
import { Link } from "react-router-dom";

export default function Room(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="row bs">
            <div className="col-md-4">
                <img src={props.room.imageUrls[0]} className="small-img" alt="Room image" />
            </div>
            <div className="col-md-7">
                <h1>{props.room.name}</h1>
                <p>Max Count: {props.room.maxCount}</p>
                <p>Room Number: {props.room.roomNumber}</p>
                <p>Type: {props.room.type}</p>
                <div style={{ float: 'right' }}>
                    {(props.fromDate && props.toDate) && (
                        <Link to={`/book/${props.room._id}/${props.fromDate}/${props.toDate}`}>
                            <button className="btn btn-primary m-2">Book Now!</button>
                        </Link>
                    )
                    }

                    <button className="btn btn-primary" onClick={handleShow}> View Details </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{props.room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {props.room.imageUrls.map(url => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block big-img"
                                        src={url}
                                        alt="Room Images"
                                    />
                                    <Carousel.Caption>
                                        <p>{props.room.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}