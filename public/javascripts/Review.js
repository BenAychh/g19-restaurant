function Review(reviewText) {
  var self = this;
  var short = true;
  var longVersion = reviewText;
  var shortVersion = reviewText.substring(0, 35);
  this.section = null;
  var pReviewText = null;
  var dots = null;
  initialize();
  function initialize() {
    self.section = document.createElement('section');
    self.pReviewText = document.createElement('p');
    self.dots = document.createElement('span');
    pReviewText.innerHTML = shortVersion;
    self.section.appendChild(pReviewText);
    dots.innerHTML = '...';
    dots.addActionListener.addEventListener('click', switchText);
  }
  function switchText(){
    pReviewText.empty();
    if(short) {
      pReviewText.innerHTML = longVersion;
    } else {
      pReviewText.innerHTML = short;
    }
    pReviewText.appendChild(dots);
  }
}
