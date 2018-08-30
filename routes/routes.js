const getImageUrls = require('get-image-urls');

var appRouter = function (app) {
    app.get("/", function (req, res) {
        res.status(200).send("Welcome to Google web scraper image API use GET /single-img/:name to search for 1 image and POST /list-img/ for a list of imgs json template : {keywords:['words','words']}");
    });

    app.get("/single-img/:name", (req, res) => {
        let name = req.params.name;

        getImageUrls('https://www.google.com.br/search?q=' + name + '&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjKzP7ip7bcAhUKHpAKHY6wDGYQ_AUICigB&', (err, images) => {
            if (!err) {
                console.log('Images found of ', name);
                res.status(200).send(images[7]);
            }
            else {
                console.log('ERROR', err);
            }
        })
    });

    app.post("/list-img/", (req, res) => {
        let names = req.body.keywords;
        let reponse = new Array();
        
        names.forEach(element => {
            getImageUrls('https://www.google.com.br/search?q=' + element + '&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjKzP7ip7bcAhUKHpAKHY6wDGYQ_AUICigB&', (err, images) => {
                if (!err) {
                    console.log('Images found of ', element);
                    names.pop();
                    reponse.push(images[7])
                }
                else {
                    console.log('ERROR', err);
                }
            }).then(()=>{
                if (names.length == 0)
                    res.status(200).send(reponse);
            })
        });
        
    });


}

module.exports = appRouter;