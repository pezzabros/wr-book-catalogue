import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';

export default class CategoryItemRender extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded : false,
        }

        this.handleClickExpand = this.handleClickExpand.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleClickExpand(){
        this.setState({
            expanded : !this.state.expanded
        })
    }

    handleSelect(){
        this.props.onCategorySelection(this.props.cat)
    }

    render() {
        let subcats = [];
        let cat_id = this.props.cat.id

        // Search categories array for elements that are children of the current category
        this.props.categories.map((subcat)=>{
            if(subcat.parent_id == cat_id){
                subcats.push(subcat)
            }
        })

        return (
            <div className="category-item" >
                <span className="category-caret">
                    {subcats.length > 0 && (
                    <span onClick={this.handleClickExpand}>
                        {this.state.expanded ?  <Glyphicon glyph="triangle-bottom" /> : <Glyphicon glyph="triangle-right" />}
                    </span>
                    )
                    }
                </span>
                <span onClick={this.handleSelect} className={this.props.selectedId == this.props.cat.id ? "category-item-name selected" : "category-item-name"}>{this.props.cat.name}</span>
                <div className="sub-categoty-list">
                    {this.state.expanded && subcats.map((c)=>{
                        return <CategoryItemRender cat={c} selectedId={this.props.selectedId} categories={this.props.categories} onCategorySelection={this.props.onCategorySelection}/>
                    })
                    }
                </div>
            </div>
        );
    }

}
