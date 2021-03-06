$(function() {
  console.log('ready');
  initialize();
});
function initialize() {
  var dropDown = document.createElement('div');
  dropDown.id = 'dropDown';
  dropDown.className = 'infoPane';
  var dropDownInfo = document.createElement('h2');
  dropDownInfo.id = 'dropDownInfo';
  $('body').append(dropDown);
  var $editInfo = $('#editInfo');
  $editInfo.submit(doEdit);
  $("#image").change(previewImage);
  $("#imageFile").change(previewImage);
}
function doEdit(event) {
  event.preventDefault();
  var form = event.currentTarget;
  var $form = $('#' + event.currentTarget.id);
  var $data = $form.serialize();
  var $dropDown = $('#dropDown');
  $dropDown.slideDown();
  $dropDown.html('<h2>Making changes...</h2>');
  $.ajax({
    type: 'put',
    url: form.action,
    data: $data,
    success: function(data, status) {
      var className = 'warning';
      if (data === 'Changes Made') {
        className = 'success';
      }
      $dropDown.append('<h2 class="' + className + '">' + data + '</h2>');
      $dropDown.delay(1000).slideUp(400, function() {
        if (data === 'Changes Made') {
          var restaurantID = $('#restaurantID').val();
          window.location.replace('/restaurants/' + restaurantID + '/');
        }
      });
    }
  });
}
function previewImage(event) {
  var $selected = $('#' + event.target.id + ' option:selected');
  if ($selected.val() != 'new') {
    $('#restaurantImage').attr( "src", $selected.val());
  } else {
    var tempPath = URL.createObjectURL(
      document.getElementById('imageFile').files[0]);
    $('#restaurantImage').attr( "src", tempPath);
  }
}
