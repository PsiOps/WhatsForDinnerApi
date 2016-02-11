module.exports = function(router){
    
    var ScheduleDay = require("../models/scheduleDays");
    var Recipe = require("../models/recipe");
    
    router.route("/scheduledays")
        .get(function(req, res) {
            
            ScheduleDay
                .find()
                .populate('recipe', 'name _id')
                .exec(function(err, scheduleDays) {
                    if (err){
                        res.send(err);
                    }
        
                    res.json(scheduleDays);
                });
        })
        .post(function(req, res){
            
            var scheduleDay = new ScheduleDay();
            
            scheduleDay.day = req.body.day;
            scheduleDay.recipe = req.body.recipeId;
            scheduleDay.recipeId = req.body.recipeId;
            
            scheduleDay.save(function(err){
                if(err){
                    res.send(err);
                }
                    
                res.json(scheduleDay);
            });
        });
};