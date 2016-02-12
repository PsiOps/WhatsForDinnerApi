var getDayQuery = function(from, upTo){
    
    if(from && upTo){
        return {'day' :  {"$gte": from, "$lt": upTo} };
    }
    
    if(from && !upTo){
        return {'day' :  {"$gte": from} };
    }
    
    if(!from && upTo){
        return {'day' :  {"$lt": upTo} };
    }
    
    return {}
}

module.exports = function(router){
    
    var ScheduleDay = require("../models/scheduleDay");
    var Recipe = require("../models/recipe");
    
    router.route("/scheduledays")
        .get(function(req, res) {
            
            var from = req.query.from;
            var upTo = req.query.upto;
            
            var dayQuery = getDayQuery(from, upTo);
            
            ScheduleDay
                .find(dayQuery)
                .populate('recipe', 'name')
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
