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
        for(let i=0; i < 6; i++){
          let newDiv = $('<div>').addClass('card food-card').attr('id', i)
          let newImage = $('<img>').attr('src', data.hits[i].recipe.image).addClass('card-body card-img-top')
          let newLabel = $('<h5>').text( data.hits[i].recipe.label).css('text-align', 'center').addClass('card-body card-text')
          let newYield = $('<p>').text('SERVES: ' + data.hits[i].recipe.yield).addClass('card-body card-text')
          let newCalories = $('<p>').text('CALORIES: ' + data.hits[i].recipe.calories).addClass('card-body card-text')
          let newDietLabels = $('<p>').text(data.hits[i].recipe.dietLabels).addClass('card-body card-text')
          let newLink =  $('<a>').text( data.hits[i].recipe.shareAs).addClass('card-body card-text')
          $('main').append(newDiv)
          newDiv.append(newImage)
          newDiv.append(newLabel)
          newDiv.append(newYield)
          newDiv.append(newCalories)
          newDiv.append(newDietLabels)
          newDiv.append(newLink)
        }
      (error)=>{
        console.log('bad');
    }

      $('.reset-btn').click(function(){
        $('main').find('div').remove();
          })
        })
      })
})
