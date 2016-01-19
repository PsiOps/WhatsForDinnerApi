var mongoose = require("mongoose");
var schema = mongoose.Schema;

var recipeSchema = new schema({
    name: String
});

module.exports = mongoose.model("Recipe", recipeSchema);