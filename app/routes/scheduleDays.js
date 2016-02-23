module.exports = function(router){
    
    var mongoose = require("mongoose");

    var moment = require('moment');
    
    var ScheduleDay = require("../models/scheduleDay");
    var dayQueryFactory = require('../services/dayQueryFactory');
    var scheduleFactory = require('../services/scheduleFactory');
    
    router.route("/scheduledays")
        .get(function(req, res) {
            
            var from = new Date(+req.query.from);
            var upTo = new Date(+req.query.upto);
            
            var fromDay = moment(from).startOf('day');
            var upToDay = moment(upTo).startOf('day');
            
            var dayQuery = dayQueryFactory.create(from, upTo);
            
            ScheduleDay
                .find(dayQuery)
                .populate('recipe', '_id name')
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
    router.route("/scheduledays/:date")
        .put(function(req, res){
            
            var searchDate = moment(new Date(+req.params.date)).startOf('day');
            
            ScheduleDay.findOne({'day' : searchDate}, function(err, scheduleDay){
                
                if (err){
                    res.send(err);
                }
                
                if(!scheduleDay){
                    scheduleDay = new ScheduleDay();
                }
                
                scheduleDay.recipe = mongoose.Types.ObjectId(req.body.recipeId);
                scheduleDay.day = searchDate;
                
                console.log(scheduleDay.recipe);
                console.log(scheduleDay.day);
                
                scheduleDay.save(function(err){
                    
                    if (err){
                        res.send(err);
                    }
                    
                    res.json({ message: 'Schedule Day put!' });
                });
            });
        })
        .delete(function(req, res){
            
            var searchDate = moment(new Date(+req.params.date)).startOf('day');

            ScheduleDay.remove({ 'day': searchDate }, function(err, scheduleDay){
                if(err){
                    res.send(err);
                }
                
                res.json({ message: 'Successfully deleted' })
            });
        });
};
