var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ingredientSchema = new schema({
    name: String,
});

module.exports = mongoose.model("Ingredient", ingredientSchema);