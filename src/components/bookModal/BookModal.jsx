import React, {Component} from 'react';
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';

export default class BookModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {title, author, language, uuid} = this.props.book

        return (
            <Modal show={this.props.visible} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={4}>
                            <Image responsive src="http://via.placeholder.com/200x300&text=Book+Cover" />
                        </Col>
                        <Col xs={8}>
                            <ul>
                                <li>
                                    <label>Author:</label>{author}
                                </li>
                                <li>
                                    <label>Language:</label>{language}
                                </li>
                                <li>
                                    <label>UUID:</label>{uuid}
                                </li>
                            </ul>
                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>
        );
    }

}
