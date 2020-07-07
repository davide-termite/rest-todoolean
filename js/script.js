$(document).ready(function(){

  // Richiamo il valore dell'input in una variabile
  var todo = $("#todo-input").val();

  // Richiamo lista già presente
  getTodo();

  // Al click del bottone "Aggiungi" viene aggiunto input alla lista
  $("#add").on('click', function(){
    addTodo();
    $("#todo-input").val("");
  });

  // Al premere del tasto invio viene aggiunto input alla lista
  $("#todo-input").keypress(function(){
    if (event.which == 13 || event.keycode == 13) {
      addTodo();
      $("#todo-input").val("");
    }
  });

  $(document).on("click", ".delete", function(){
    var id = $(this).parents("li").attr("data-id");
    deleteTodo(id);
  })

});

// Funzione che riprende elementi della lista
function getTodo(){
  $("#list").html(" ");
  $.ajax(
    {
      url: "http://157.230.17.132:3031/todos/",
      method: "GET",
      success: function(data){
        for (var i = 0; i < data.length; i++) {

          var source = $("#todo-template").html()
          var template = Handlebars.compile(source);

          var newElement = {
            id: data[i].id,
            text: data[i].text,
          };

          var html = template(newElement);
          $("#list").append(html);
        }
      },
      error: function(error){
        alert("C'è stato un errore")
      }
    }
  );
}

// Funzione che aggiunge elementi della lista
function addTodo(){
  var newTodo = $("#todo-input").val();

  if (newTodo != "") {
    $.ajax(
      {
        url: "http://157.230.17.132:3031/todos/",
        method: "POST",
        data: {
          'text' : newTodo,
        },
        success: function(data){
          getTodo();
        },
        error: function(error){
          alert("C'è stato un errore")
        }
      }
    );
  }
}

// Funzione che cancella elementi della lista
function deleteTodo(id){
  $.ajax(
    {
      url: "http://157.230.17.132:3031/todos/" + id,
      method: "DELETE",
      success: function(){
        getTodo();
      },
      error: function(error){
        alert("C'è stato un errore")
      }
    }
  );
}
