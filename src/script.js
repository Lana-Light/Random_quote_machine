let animState = {
  star: "star-circle flex",
  text: "q-box",
  button: ""
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      link: "#",
      anim: animState
    };
    this.newQuote = this.newQuote.bind(this);
    this.animation = this.animation.bind(this);
    this.color = this.color.bind(this);
  }
  color() {
    var backs = [
      "url('https://img.wallpapersafari.com/img720/55/68/XCL6U4.jpg')",
      "url('https://im0-tub-ua.yandex.net/i?id=406a7927af76842f7d1fa6549195d526&n=13') no-repeat",
      "radial-gradient(circle,hsla(240,100%,50%,1) ,hsla(240,100%,95%,0.5) ), url('http://1.bp.blogspot.com/-iypaPDUdyH0/UXPDJ8olkGI/AAAAAAAANcU/1MCJubNoGFU/s1600/Sprite_FX_Stars_0027.png')"
    ];
    var i = Math.floor(Math.random() * backs.length);
    $("h1+p")
      .css("background", backs[i])
      .css("background-size", "100% auto");
    $("#quote-box")
      .css("background", backs[i])
      .css("background-size", "100% auto");
  }
  animation(e) {
    (function() {
      e.target.checked
        ? this.setState({
            anim: {
              star: "star-circle anim-star",
              text: "q-box anim-text",
              button: "anim-button"
            }
          })
        : this.setState({
            anim: animState
          });
    }.bind(this)());
  }
  newQuote() {
    this.color();
    $.getJSON(
      "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
      function(json) {
        this.setState({
          quote: json.quoteText,
          author: json.quoteAuthor,
          link: `https://twitter.com/intent/tweet?text="${json.quoteText}" ~ ${
            json.quoteAuthor
          } ~`
        });
      }.bind(this)
    );
  }
  componentDidMount() {
    this.newQuote();
  }
  render() {
    return (
      <div>
        <h1>Random Quote Machine</h1>
        <p>
          It is a random quote machine. Click button below to get a new random
          quote. Also you can tweet out the quote.
        </p>
        <div id="quote-box" className={this.state.anim.text}>
          <div className={this.state.anim.star}>
            <q id="text">{this.state.quote}</q>
          </div>
          {this.state.author && (
            <p id="author" className={this.state.anim.star}>
              <em>~ {this.state.author} ~</em>
            </p>
          )}
          <label>
            Animation <input onClick={this.animation} type="checkbox" class="che-input" /><span class="che-span"></span>
          </label>
          <br />
          <button
            onClick={this.newQuote}
            id="new-quote"
            className={this.state.anim.button}
          >
            New quote
          </button>
          <button className={this.state.anim.button}>
            <a id="tweet-quote" target="_blank" href={this.state.link}>
              Tweet quote
            </a>
          </button>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
