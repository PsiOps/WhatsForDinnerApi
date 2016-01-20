module.exports = function(router){

   var Recipe = require("../models/recipe"); 
    
  router.route("/recipes")
    .post(function(req, res){
        
        var recipe = new Recipe();
        
        recipe.name = req.body.name;
        
        recipe.save(function(err){
            if(err){
                res.send(err);
            }
                
            res.json({message: "Recipe created!"})
        })
    })

    .get(function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err){
                res.send(err);
            }

            res.json(recipes);
        });
    });
};