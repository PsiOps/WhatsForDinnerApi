var mongoose = require("mongoose");
var schema = mongoose.Schema;

var recipeSchema = new schema({
    name: String,
    description: String,
    ingredients: [{type: schema.Types.ObjectId, ref: 'Ingredient'}]
});

module.exports = mongoose.model("Recipe", recipeSchema);