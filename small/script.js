class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      link: "#"
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
    if (e.target.checked) {
      $("button").addClass("anim-button");
      $(".star-circle").addClass("anim-star");
      $("#quote-box").addClass("anim-text");
    } else {
      $("button").removeClass("anim-button");
      $(".star-circle").removeClass("anim-star");
      $("#quote-box").removeClass("anim-text");
    }
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
        <h1>
          <span className="star-angled" />Random Quote Machine<span className="star-angled" />
        </h1>
        <p>
          It is a random quote machine.Click button below to get a new random
          quote. Also you can tweet out the quote.
        </p>
        <div id="quote-box">
          {this.state.quote && (
            <div className="flex">
              <span className="star-circle" />
              <q id="text">{this.state.quote}</q>
              <span className="star-circle" />
            </div>
          )}
          {this.state.quote && (
            <p id="author">
              <span className="star-circle" />
              <em>~ {this.state.author} ~</em>
              <span className="star-circle" />
            </p>
          )}
          <label>Animation<input onClick={this.animation} type="checkbox" /></label>
          
          <br />
          <button onClick={this.newQuote} id="new-quote">
            New quote
          </button>
          <button>
            {this.state.quote ? (
              <a id="tweet-quote" target="_blank" href={this.state.link}>
                Tweet quote
              </a>
            ) : (
              "No quote yet"
            )}
          </button>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
