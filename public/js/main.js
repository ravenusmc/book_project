//Ajax code to delete a book. 
$(document).ready(function(){
  $('.delete-book').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/books/' + id,
      success: function(response){
        alert('Deleting Book');
        window.location.href='/book';
      },
      error: function(err){
        console.log(err);
      }
    })
  });
});