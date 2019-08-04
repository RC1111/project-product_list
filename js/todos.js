// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function() {
  $(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click", "span", function(event) {
  $(this)
    .parent()
    .fadeOut(500, function() {
      $(this).remove();
    });
  event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
  if (event.which === 13) {
    //grabbing new todo text from input
    var todoText = $(this).val();
    $(this).val("");
    //create a new li and add to ul
    $("ul").append(
      "<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>"
    );
  }
});

$(".fa-plus").click(function() {
  $("input[type='text']").fadeToggle();
});

var myArray = [
  "“Whatever the mind of man can conceive and believe, it can achieve.” – Napoleon Hill",
  "“The tragedy in life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach.” – Benjamin Mays",
  "“Strive not to be a success, but rather to be of value.” – Albert Einstein",
  "“The future depends on what you do today.” – Mahatma Gandhi"
];

var randomItem = myArray[Math.floor(Math.random() * myArray.length)];

// var intervalID = window.setInterval(myArray, 2000);

// document.getElementById("quote").innerHTML = randomItem;
