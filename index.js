
const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 5000
var entreeList = [{ id: "chickenfriedsteak", name: "Chicken Fried Steak"},
                  { id: "ribeyesteak", name: "Ribeye Steak"},
                  { id: "baconlettucetomatosandwich", name: "Bacon Lettuce and Tomato"},
                  { id: "lentilsoup", name: "Lentil Soup"}
                 ];

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .get('/configuremenu', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/configuremenu.html'));
  })
  .get('/api/entrees', function(req, res){
    res.send(JSON.stringify(entreeList));
  })
  .delete('/api/entrees/:id', function(req, res){
    if(req.params in entreeList.id){
      entreeList = entreeList.filter(x => x.id != req.params);
      res.sendStatus(204);
    }
    res.sendStatus(404);
  })
  .use(bodyparser.json())
  .post('/api/entrees', function(req, res){
      entreeList.push(req.body.data);
      res.sendStatus(201);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  