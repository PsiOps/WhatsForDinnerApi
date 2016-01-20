var mongoose = require("mongoose");
var schema = mongoose.Schema;

var recipeSchema = new schema({
    name: String,
    description: String
});

module.exports = mongoose.model("Recipe", recipeSchema);