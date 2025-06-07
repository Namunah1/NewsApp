import React, { Component } from 'react' ;
import Newsitem from './Newsitem' ;
import PropTypes from 'prop-types';


export default class News extends Component {
  
 
static defaultProps = {
  category : "general" 
}

static propTypes = {
  category: PropTypes.string,
}

constructor (props){
   super(props) ;
   this.state = {
      article : [] ,
      page : 1 ,
      loading: false,
      totalResults: 0,
   }
}
  
async updateNews() {
  this.setState({ loading: true });
  const { category } = this.props;
  let apis = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=2083bff861ca4e48b0026d1ebe6f5f9d&page=${this.state.page}` ;
  let dataa = await fetch(apis) ;
  let parseddata = await dataa.json() ;
  this.setState({
    article : parseddata.articles ,
    totalResults: parseddata.totalResults,
    loading: false
  }) ;
}

async componentDidMount(){
  this.updateNews();
}

// Add componentDidUpdate to fetch news when category changes
async componentDidUpdate(prevProps) {
  if (this.props.category !== prevProps.category) {
    this.setState({ page: 1 }, () => this.updateNews());
  }
}

 handlePrevClick = async () => {
  this.setState({ page: this.state.page - 1 }, () => this.updateNews());
}

handleNextClick = async () => {
  this.setState({ page: this.state.page + 1 }, () => this.updateNews());
}

  render() {
  
    return (
      <div className="news-grid-container">
        {/* <div className="loading-indicator">{this.state.loading && 'Loading...'}</div> */}
        
        {this.state.article.map((elem) => {
            // Only render Newsitem if an image URL exists
            if (elem.urlToImage) {
                return(
                    <Newsitem 
                        key = {elem.url}  
                        title = {elem.title} 
                        image = {elem.urlToImage} 
                        url = {elem.url} 
                        desc = {elem.description ? elem.description.slice(0, 88) : ""}
                    />
                );
            } else {
                return null; // Don't render if no image
            }
        })}
      
        <div className="pagination-controls">
          <button 
            disabled = {this.state.page <= 1} 
            type="button" 
            className="pagination-btn" 
            onClick={this.handlePrevClick}
          >
            Previous
          </button>
          <button 
            disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/20)}
            type="button" 
            className="pagination-btn" 
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

