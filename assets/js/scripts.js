(function(window){ 
  window.toggle = function () {
    var elements = document.getElementsByClassName('toggleable');
    var arrayLength = elements.length;
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.style.display === 'none') {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
    }

  }
})(window);
