module.exports = function(router){
    
    var moment = require('moment');
    
    var ScheduleDay = require("../models/scheduleDay");
    var dayQueryFactory = require('../services/dayQueryFactory');
    var scheduleFactory = require('../services/scheduleFactory');
    
    router.route("/scheduledays")
        .get(function(req, res) {
            
            var from = new Date(req.query.from);
            var upTo = new Date(req.query.upto);
            
            var fromDay = moment(from).startOf('day');
            var upToDay = moment(upTo).startOf('day');
            
            var dayQuery = dayQueryFactory.create(from, upTo);
            
            ScheduleDay
                .find(dayQuery)
                .populate('recipe', 'name')
                .exec(function(err, scheduleDays) {
                    
                    if (err){
                        res.send(err);
                    }
        
                    if(scheduleDays.length == 0){
                        res.json(scheduleFactory.createEmpty(fromDay, upToDay));
                        return;
                    }
        
                    res.json(scheduleFactory.create(fromDay, upToDay, scheduleDays));
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
        })
    router.route("/scheduledays/:scheduleday_id")
        .put(function(req, res){
            ScheduleDay.findById(req.params.scheduleday_id, function(err, scheduleDay){
               
                if (err){
                    res.send(err);
                }
                
                scheduleDay.recipeId = req.body.recipeId;
                scheduleDay.recipe = req.body.recipeId;
                
                scheduleDay.save(function(err){
                    
                    if (err){
                        res.send(err);
                    }
                    
                    res.json({ message: 'Schedule Day updated!' });
                });
            });
        })
        .delete(function(req, res){
            
            ScheduleDay.remove({
                _id: req.params.scheduleday_id
            }, function(err, scheduleDay){
                if(err){
                    res.send(err);
                }
                
                res.json({ message: 'Successfully deleted' })
            });
        });
};
