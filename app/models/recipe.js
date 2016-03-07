var mongoose = require("mongoose");
var schema = mongoose.Schema;

var recipeSchema = new schema({
    name: String,
    description: String,
    ingredients: [{
        ingredient: {type: schema.Types.ObjectId, ref: 'Ingredient'},
        amount: Number,
        unit: String
    }]
});

module.exports = mongoose.model("Recipe", recipeSchema);