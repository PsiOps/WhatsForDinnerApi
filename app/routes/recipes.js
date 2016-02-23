module.exports = function(router){

  var Recipe = require("../models/recipe"); 
    
  router.route("/recipes")
    .post(function(req, res){
        
        var recipe = new Recipe();

        recipe.name = req.body.name;
        recipe.description = req.body.description;
        
        recipe.save(function(err){
            if(err){
                res.send(err);
            }
                
            res.json(recipe);
        })
    })

    .get(function(req, res) {
        
        console.log("Finding all Recipes");
        
        Recipe
            .find()
            .populate('ingredients')
            .exec(function(err, recipes)
            {
                if (err){
                    res.send(err);
                }

                res.json(recipes);
            });
        })

  router.route("/recipes/:recipe_id")
    .get(function(req, res){
        
        console.log("Finding specific Recipe");
        
        Recipe.findById(req.params.recipe_id, function(err, recipe){
            if (err){
                res.send(err);
            }
            
            res.send(recipe);
        });
    })
    
    .put(function(req, res) {
        
        Recipe.findById(req.params.recipe_id, function(err, recipe){
            
            if (err){
                res.send(err);
            }
                
            recipe.name = req.body.name;
            recipe.description = req.body.description;
            
            recipe.save(function(err){
                if (err){
                    res.send(err);
                }

                res.json({ message: 'Recipe updated!' });
            });
        });
    })
    
    .delete(function(req, res){
        
        Recipe.remove({
            _id: req.params.recipe_id
        }, function(err, recipe){
            if(err){
                res.send(err);
            }
            
            res.json({ message: 'Successfully deleted' })
        });
    });
};