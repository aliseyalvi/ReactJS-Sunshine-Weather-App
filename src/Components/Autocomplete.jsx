import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {debounce} from "lodash";
import { throttle } from "lodash";
//import debounce from 'lodash.debounce';
class Autocomplete extends Component {
  

  

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      fetchedSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      inputCity:""
    };
    //this.fetchAPI = throttle(this.fetchAPI, 1000)
    //this.onChangeDebounced = debounce(this.fetchAPI, 1000)
  }
  
  fetchAPI=debounce((value)=> {
    console.log('value :: ', value);
    // call ajax
    return fetch(`https://api.locationiq.com/v1/autocomplete.php?key=pk.f01a4da96401b09a4711706dc65f03a6&q=${value}`)
    .then(response =>response.json())
    .then((data)=>{
      //console.log(data);
      
      let suggestionsArr=[];
      
      data.map((suggestion)=>{
        let suggestionObj={
          name:'',
          lat:'',
          lng:'',
          city:''
        }
        suggestionObj.name=suggestion.display_name;
        suggestionObj.lat=suggestion.lat;
        suggestionObj.lng=suggestion.lon;
        suggestionObj.city=suggestion.display_place;
        suggestionsArr.push(suggestionObj)
        //console.log(suggestionObj)
        //console.log(suggestionsArr);
        
      })
        this.setState({
            fetchedSuggestions: [...suggestionsArr],
        })
        //console.log(suggestionsArr);
        
      
    })
  },500)
  
  handleSearch = e =>{

    console.log("handleSearch: "+this.state.userInput);
    if(this.state.userInput.localeCompare("")!==0){
      console.log("handleSearch: "+this.state.userInput);
      /*
      this.fetchAPI(this.state.userInput);
      console.log(this.state.fetchedSuggestions);
      */
     console.log("Inside handleSearch: ");
      console.log(this.state.fetchedSuggestions);
      this.props.getLatLong(this.state.fetchedSuggestions);
      //console.log(this.props.getLatLong(this.state.fetchedSuggestions));
      
    }
    
  }
  onChange = e => {
      
    const { suggestions } = this.props;
    //console.log(e.currentTarget.value);
    
    const userInput = e.currentTarget.value;
    if(userInput.localeCompare("")!==0){
      //this.onChangeDebounced(e.currentTarget.value);
      this.fetchAPI(userInput);
    }
    console.log("Inside Onchange: ");
    console.log(this.state.fetchedSuggestions);
    
    const  fetchedsuggestions  =this.state.fetchedSuggestions;
    //console.log(fetchedsuggestions);
    //console.log(this.fetchAPI(userInput).then(response => console.log(response)))
    
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions=fetchedsuggestions;
    /*
    const filteredSuggestions = fetchedsuggestions.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    */
      //console.log(filteredSuggestions)
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  componentDidMount(){
    this.fetchAPI("a");
  }
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={index} onClick={onClick}>
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        <button onClick={this.handleSearch} className="search">Search</button>
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
