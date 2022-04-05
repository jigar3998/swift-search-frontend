import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import Constants from "./Constants";
import { Link } from "react-router-dom";
import "./App.css";


class HomePage extends Component{
    render() {
        return (            
          <ReactiveBase
            app={Constants.elasticSearchAppName}
            url= {Constants.elasticSearchUrl}
            //url="http://192.168.2.86:9200/"  
          >
            
            {/* Navigation Bar */}
            <div className="navbar">
              <div className="logo">Swift Search</div>
    
              {/* Configuring Search Bar */}
              <DataSearch
                componentId="mainSearch"
                dataField={[
                  {
                    "field": "title",
                    "weight": 4
                  },
                  {
                    "field": "description",
                    "weight": 3
                  },
                  // {
                  //   "field": "author_name",
                  //   "weight": 2
                  // },
                  // "publisher",
                  // "format",
                  // "language"
                ]}
                queryFormat="or"
                placeholder="Search Me"
                iconPosition="left"
                // autosuggest={true}
                highlight={false}
                // highlightField={["title","description","author_name"]}
                filterLabel="search"
                fuzziness={0}
                URLParams={false}
                debounce={100}
                // enableRecentSuggestions={true}
                // enablePopularSuggestions={true}
                // enablePredictiveSuggestions={true}
                // popularSuggestionsConfig={{
                //   size: 3,
                //   minHits: 2,
                //   minChars: 4,
                // }}
                // recentSuggestionsConfig={{
                //   size: 3,
                //   minChars: 4,
                // // }}
                index="title"
                // size={10}
                className="searchbar"
                innerClass={{
                  input: "searchbox",
                  list: "suggestionlist",
                }}
              />
            </div>
    
            {/* Body having side bar and main content */}
            <div className={"display"}>
    
              {/* Configuring Side Bar with filters */}
              <div className={"leftSidebar"}>
                <span className="filter">Filters</span>
                <RangeSlider                                    //For Publish date
                  componentId="publishDateFilter"
                  dataField="publication_date"
                  title="Year of Publication"
                  filterLabel="published"
                  range={{
                    start: new Date('1950-12-12'),
                    end: new Date('2022-12-12'),
                  }}
                  defaultValue={{
                    start: new Date('1950-12-12'),
                    end: new Date('2022-12-12'),
                  }}
                  rangeLabels={{
                    start: "1950",
                    end: "2022",
                  }}
                  showHistogram={true}
                  queryFormat='basic_date'
                  showFilter={true}
                  includeNullValues
                  interval={2}
                />
                <MultiList                                            //Filter data by author name
                  componentId="authorFilter"
                  dataField="author_name.keyword"
                  title="Authors"
                  size={5}
                  showCheckbox={true}
                  className="authors"
                  innerClass={{
                    list: "author-list",
                  }}
                  placeholder="Filter by author name"
                  filterLabel="Authors"
                />
                
                <MultiList                                                        //Filter data by publisher name
                  componentId="publisherFilter"
                  dataField="publisher.keyword"
                  title="Publishers"
                  size={1000}
                  showCheckbox={true}
                  className="publishers"
                  innerClass={{
                    list: "publisher-list",
                  }}
                  placeholder="Filter by publisher name"
                  filterLabel="Publishers"
                />
    
                <MultiList                                                        //Filter data by format type
                  componentId="formatFilter"
                  dataField="format.keyword"
                  title="Data Format"
                  size={1000}
                  showCheckbox={true}
                  className="dataFormat"
                  innerClass={{
                    list: "format-list",
                  }}
                  placeholder="Filter by format type"
                  filterLabel="Format"
                />
    
                <MultiList                                                      //Filter data by language
                  componentId="languageFilter"
                  dataField="language.keyword"
                  title="Languages"
                  size={1000}
                  showCheckbox={true}
                  className="languages"
                  innerClass={{
                    list: "language-list",
                  }}
                  placeholder="Filter by languages"
                  filterLabel="Languages"
                />
    
                <RangeSlider                                                    //Filter data by page numbers
                  componentId="pageFilter"
                  dataField="num_pages"
                  title="Number of Pages"
                  filterLabel="total pages"
                  range={{
                    start: 0,
                    end: 5000,
                  }}
                  rangeLabels={{
                    start: 0,
                    end: 5000,
                  }}
                    showFilter={true}
                  includeNullValues
                  interval={2}
                />
    
              </div>
              
                {/* Main Body  */}
               <div className={"mainBar "}>                               
               
               {/* Shows filters on top */}
                <SelectedFilters />  
    
                {/* Shows the main content   */}
                <ReactiveList
                  componentId="SearchResult"
                  dataField={[
                    {
                      "field": "title",
                      "weight": 5
                    },
                    {
                      "field": "description",
                      "weight": 1
                    },
                    {
                      "field": "author_name",
                      "weight": 1
                    },
                    "publisher",
                    "format",
                    "language"
                  ]}
                  size={12}
                  showResultStats={true}
                  pagination
                  loader={<div class="loader"></div>}
                  renderResultStats={
                    function(stats){
                        return (
                            `Showing ${stats.numberOfResults} in ${stats.time} ms`
                        )
                    }
                  }
                  
                  react={{
                    and: [
                      "mainSearch",
                      "publishDateFilter",
                      "authorFilter",
                      "publisherFilter",
                      "formatFilter",
                      "languageFilter",
                      "pageFilter" 
                    ],
                  }}

                  ////Link  to={`/${item.id}`}
                  
                  render={({ data }) => (
                    <div className="cardContainer">
                        {data.map((item) => (
                          <Link to={`/information/${item._uuid}`} className="resultCard" >
                          {item.image_url==null?<img className="cardImage" src="https://cms.cut.ac.za/Files/Images/f25625f6-e024-444b-b31e-be7db64abb44.jpg" />: <img className="cardImage" src={item.image_url} />}
                          <div className="cardData">
                            <div
                              className="title"
                              dangerouslySetInnerHTML={{
                                __html: item.title,
                              }}
                            />
    
                            <div className="flex column justify-space-between">
                              <div className="description">
                                {item.description}
                              </div>
                              
                              <div>
                                <div className="tags">   
                                <span>Tags: </span>  
                                {item.author_name==null?"":  <div>
                                   <span className="authors-list tag">
                                    {item.author_name}
                                    </span></div>}
    
                                  {item.publisher==null?"":  <div>
                                  <span className="publishers-list tag">
                                  {item.publisher}
                                  </span></div>}
    
                                  {item.publication_date==null?"":  <div>
                                  <span className="pub-year tag">
                                  {item.publication_date}
                                  </span></div>}
                                      
                                </div>                       
                              </div> 
                              </div>
                            </div>
                            </Link>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
            
          </ReactiveBase>
        );
      }
}

export default HomePage