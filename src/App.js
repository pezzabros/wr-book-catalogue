import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';
import BookList from './components/bookList/BookList'
import CategoryList from './components/categoryList/CategoryList'
import { Grid, Col, Row } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            catId: null,
            catName : ""
        }

        this.handleCategorySelection = this.handleCategorySelection.bind(this);
        this.clearCategorySelection = this.clearCategorySelection.bind(this);
    }

    handleCategorySelection(cat){
        this.setState({
            catId : cat.id,
            catName: cat.name
        })
    }

    clearCategorySelection(cat){
        this.setState({
            catId: null,
            catName : ""
        })
    }

    render() {
        return (
            <div className="App">
                <Grid>
                  <Row>
                      <Col xs={12} className="header">
                          <span id="logo-container"></span>
                          <h1>
                              Book catalogue
                          </h1>
                      </Col>
                  </Row>
                  <Row>
                      <Col xs={4} className="categories-container">
                          <CategoryList selectedId={this.state.catId} onCategorySelection={this.handleCategorySelection} />
                      </Col>
                      <Col xs={8} className="books-container">
                          <BookList categoryId={this.state.catId} categoryName={this.state.catName} onCategoryClear={this.clearCategorySelection} />
                      </Col>
                  </Row>
                </Grid>
          </div>
        );
    }
}

export default App;
