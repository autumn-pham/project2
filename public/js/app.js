$(()=>{
  $('.food-search').on('submit', (event)=>{
    event.preventDefault();
    let userInput = $('input[type="text"]').val();
    $(event.currentTarget).trigger('reset')


    $.ajax({
      url: 'https://api.edamam.com/search?app_id=927171e6&app_key=9e3a3770c81d61fe5e36b7dc6062fa7c&q=' + userInput

    }).then(
      (data)=>{
        console.log(data)
        for(let i=0; i < 5; i++){
          let newDiv = $('<div>').addClass('food-list').attr('id', i)
          let newLabel = $('<li>').text('Food: ' + data.hits[i].recipe.label).css('text-align', 'center')
          let newImage = $('<img>').attr('src', data.hits[i].recipe.image)
          let newLink =  $('<li>').text('Link to recipe: ' + data.hits[i].recipe.shareAs)
          let newCalories = $('<li>').text('Link to recipe: ' + data.hits[i].recipe.calories)
          $('ul').append(newDiv)
          newDiv.append(newLabel)
          newDiv.append(newImage)
          newDiv.append(newLink)
          newDiv.append(newCalories)
        }
      (error)=>{
        console.log('bad');
    }

      $('.reset-btn').click(function(){
        $('ul').find('div').remove();
          })
        })
      })
})
