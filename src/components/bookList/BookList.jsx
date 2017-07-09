import React, {Component} from 'react';
import Api from '../../api/Api'
import {Pagination} from 'react-bootstrap';
import BookItemRender from './BookItemRender'
import BookModal from '../bookModal/BookModal'

export default class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            loading : false,
            books: [],
            totalPages: 1,
            selectedBook : {},
            showBookModal : false
        }

        this.loadBooks = this.loadBooks.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.showModalInfo = this.showModalInfo.bind(this)
        this.hideModalInfo = this.hideModalInfo.bind(this)
    }

    componentDidMount(){
        this.loadBooks( this.props.categoryId )
    }

    componentWillReceiveProps(newProps){
        if(newProps.categoryId != this.props.categoryId){
            this.setState({
                books : [],
                activePage: 1
            });
            this.loadBooks(newProps.categoryId)
        }
    }

    handleChangePage(eventKey) {
        this.setState({
            books : [],
            activePage: eventKey
        });

        this.loadBooks(this.props.categoryId)
    }

    loadBooks(catId){
        this.setState({
            loading : true
        })

        //If a category is specified, load the book for the category. Otherwise all books are loaded
        if(catId){
            Api.getBooksByCategory( catId, this.state.activePage ).then((res) =>{
                if(!res){
                    res = []
                }
                this.setState({
                    books : res.books,
                    totalPages : res.total_pages,
                    loading : false
                })
            })

        }else {
            Api.getAllBooks( this.state.activePage ).then((res) =>{
                if(!res){
                    res = []
                }
                this.setState({
                    books : res.books,
                    totalPages : res.total_pages,
                    loading : false
                })
            })
        }
    }

    showModalInfo( book ){
        console.log("show book")
        this.setState({
            selectedBook : book,
            showBookModal : true
        })
    }

    hideModalInfo( book ){
        this.setState({
            showBookModal : false
        })
    }


    render() {

        let content = ""
        if(this.state.loading){
            content = (
                <div className="loader">
                    Loading...
                </div>
            )
        }else {
            content = (<div>
                        {this.state.books.map((book)=>{
                            return <BookItemRender book={book} onShowBookInfo={this.showModalInfo} />
                        })}
                        </div>
            )
        }

        return (
            <div>
                <div className="books-header">
                    {(this.props.categoryId != null) ?
                        (<span>
                            List of books under the category <label>{this.props.categoryName}</label>
                            <a onClick={(e)=>{this.props.onCategoryClear()}} style={{float:"right"}}>See all</a>
                        </span>)
                        :
                        (<p>All books</p>)
                    }
                </div>
                <div className="book-list">
                    {content}
                </div>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={3}
                    bsSize="small"
                    items={this.state.totalPages}
                    activePage={this.state.activePage}
                    onSelect={this.handleChangePage} />

                <BookModal visible={this.state.showBookModal} book={this.state.selectedBook} onClose={this.hideModalInfo} />
            </div>
        )
    }


}
