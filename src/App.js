import React from "react";

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * "0xFFFFFF").toString(16);
};
const changeBodyColor = () => {
  const bgColor = generateRandomColor();
  const textColor = generateComplimentColor(bgColor);
  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;
};
const generateComplimentColor = randomColor => {
  return randomColor.indexOf("#") === 0
    ? "#" + ("0xffffff" ^ ("0x" + randomColor.substring(1))).toString(16)
    : "#" + ("0xffffff" ^ ("0x" + randomColor)).toString(16);
};
const QuoteBox = ({ quote, author, onClick }) => {
  const text = `${quote} — ${author}`;
  const url = `https://twitter.com/intent/tweet?hashtags=freeCodeCamp&related=freeCodecamp&text=${encodeURIComponent(
    text
  )}`;
  return (
    <div className="wrapper-box">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="social-top">
          <div className="fa fa-twitter" />
        </div>
      </a>
      <div className="quote-box">
        <div className="quote">
          <p>{text}</p>
        </div>
        <div className="quote-box-footer">
          <button className="new-quote-button" onClick={onClick}>
            New Quote
          </button>
        </div>
      </div>

    </div>
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote:
        "If you can't get rid of the skeleton in your closet, you'd best teach it to dance.",
      author: "George Bernard Shaw"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.getQuote();
  }
  async getQuote() {
    await fetch(
      "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
      {
        headers: new Headers({
          "X-Mashape-Key": "mwDwEyhtUmmshdv7LY78hO2cYc3Jp1b6bXpjsnh46c4z1onOyP",
          "Content-Type": "application/x-www-form-urlencoded"
        })
      }
    ).then(response => {
      if (response.status !== 200) {
        console.log("Response error" + response.status);
        return;
      }
      response.json().then(data => {
        this.setState({ quote: data.quote, author: data.author });
      });
    });
  }
  componentDidMount() {
    changeBodyColor();
    this.getQuote();
  }
  render() {
    return (
      <div className="wrapper">
        <QuoteBox
          quote={this.state.quote}
          author={this.state.author}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}
export default App;
