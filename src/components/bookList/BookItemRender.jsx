import React, {Component} from 'react';
import { Col, Row, Glyphicon, Button } from 'react-bootstrap';

export default class BookItemRender extends Component {
    constructor(props) {
        super(props);

        this.showBookInfo = this.showBookInfo.bind(this)
    }

    showBookInfo(){
        this.props.onShowBookInfo(this.props.book)
    }

    render() {
        return (
            <div className="book-item">
                <Row>
                    <Col xs={10}>
                        <Row>
                            <Col xs={10}>
                                <h4>{this.props.book.title}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <label>Author: </label><span>{this.props.book.author}</span>
                            </Col>
                            <Col xs={6}>
                                <label>Language: </label><span>{this.props.book.language}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={2}>
                        <Row>
                            <Col xs={2} className="book-info-handle">
                                <Button bsStyle="info" onClick={this.showBookInfo}>
                                    <Glyphicon glyph="info-sign"/>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

}
