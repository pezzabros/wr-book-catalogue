import React, {Component} from 'react';
import Api from '../../api/Api'
import { Col, Row, Glyphicon, Button } from 'react-bootstrap';
import CategoryItemRender from './CategoryItemRender'

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }

        this.loadCategories = this.loadCategories.bind(this)
    }

    componentDidMount(){
        this.loadCategories()
    }

    loadCategories() {
         Api.getAllCategories().then((res) => {
            this.setState({
                categories: res.categories
            })
        })
    }

    render() {
        //List only show top level categories (with "parent_id" set to null). CategoryItemRender will show subcategories recursively
        return (
            <div>
                {
                    this.state.categories.map((cat)=>{
                        if(cat.parent_id == null){
                            return <CategoryItemRender selectedId={this.props.selectedId} cat={cat} categories={this.state.categories} onCategorySelection={this.props.onCategorySelection}/>
                        }
                    })
                }
            </div>
        );
    }

}
