module.exports = {
    
    addOrUpdate : function(existingRecipe, updatedRecipe){
        
        var Ingredient = require("../models/ingredient");
        
        updatedRecipe.ingredients.forEach(function(recipeIngredient){
            
            var ingredientId = recipeIngredient.ingredient._id;
            
            if(ingredientId == null){
             
                var ingredient = new Ingredient();
                
                ingredientId = ingredient._id;
                
                ingredient.name = recipeIngredient.ingredient.name;
                
                ingredient.save(function(err){
                    
                    if(err){
                        console.log(err);
                        return;
                    }
                });
            }

            recipeIngredient.ingredient = ingredientId;
        });
        
        existingRecipe.ingredients = updatedRecipe.ingredients;
    }
}