import React, { Component } from "react";
import Constants from "./Constants";
import "./App.css";
import "./Article.css"

export class ArticlePage extends Component {
  state = {
    data: {}
  };
  componentDidMount() {
    //console.log(Constants.elasticSearchUrl+"/"+ Constants.elasticSearchAppName);
    fetch(
      Constants.elasticSearchUrl+"/"+ Constants.elasticSearchAppName +"/_search?q=uuid:" + this.props.match.params.id
    )
      .then(response => {
        // console.log(Constants.elasticSearchUrl+"/"+ Constants.elasticSearchAppName +"/_search?q=_id:E5nx8H8B7X1CA3BjawZK");
        // console.log(response.json())
        return response.json();
      })
      .then(myJson => {
        console.log(myJson.hits.hits[0]._source);
        this.setState({ data: myJson.hits.hits[0]._source });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }
  render() {
    return (
      <div>
        <div className="navbar">
                <div className="logo">Swift Search</div>
        </div>
          <article className="article">
            <h2 className="article-title">{this.state.data.title}</h2>
            <p className="article-description">{this.state.data.description}</p>
        </article>
      </div>
    );
  }
}
export default ArticlePage