var article = document.getElementById('reviews');
var keys = Object.keys(reviewsFromDB);
keys.forEach(function(key) {
  var tempReview = new Review(reviewsFromDB[key]);
  article.appendChild(tempReview.section);
});
function Review(review) {
  console.log(review);
  var self = this;
  var short = true;
  var longVersion = review.text;
  var shortVersion = review.text.substring(0, 35);
  this.section = null;
  var pReviewText = null;
  var dots = null;
  initialize();
  function initialize() {
    self.section = document.createElement('section');
    self.section.innerHTML = '<div><span class="rateit" ' +
      'data-rateit-value="' + review.rating + '" data-rateit-ispreset="true"' +
      ' data-rateit-readonly="true"></span>' +
      ' | <strong>Reviewed By:</strong> <span class="name">'
        + review.reviewed_by + '</span>' +
      ' | <strong>Created:</strong> ' + review.created_date +
      ' | <strong>Modified:</strong> ' + review.modified_date;
      if (user_id == review.user_id) {
        self.section.innerHTML += '<a href="/restaurants/' + restaurantID + '/' +
        'reviews' + '/' + review.id.toString() + '/edit"' +
        ' class="editReview">edit</a>';
      }
      self.section.innerHTML += '</div>';
    pReviewText = document.createElement('p');
    dots = document.createElement('span');
    pReviewText.innerHTML = shortVersion;
    self.section.appendChild(pReviewText);
    if (longVersion.length > 35) {
        dots.innerHTML = '...';
        dots.addEventListener('click', switchText);
    }
    pReviewText.appendChild(dots);
  }
  function switchText(){
    pReviewText.innerHTML = '';
    if(short) {
      pReviewText.innerHTML = longVersion;
    } else {
      pReviewText.innerHTML = shortVersion;
    }
    pReviewText.appendChild(dots);
    short = !short;
  }
}
