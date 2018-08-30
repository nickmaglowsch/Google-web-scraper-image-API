var getImageUrls = require('get-image-urls');

getImageUrls('https://www.google.com.br/search?q=ma%C3%A7%C3%A3&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjKzP7ip7bcAhUKHpAKHY6wDGYQ_AUICigB&biw=2560&bih=984', function(err, images) {
  if (!err) {
    console.log('Images found', images.length);
    console.log(images[6]);
  }
  else {
    console.log('ERROR', err);
  }
})