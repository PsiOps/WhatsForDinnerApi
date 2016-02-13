module.exports = function(router){
    
    var ScheduleDay = require("../models/scheduleDay");
    var moment = require('moment');
    
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
    
    var getEmptyDay = function(date){
        
        var emptyDay = new ScheduleDay();
                                
        emptyDay.day = new Date(date);
        
        return emptyDay;
    }
    
    var getEmptySchedule = function(fromDay, upToDay){
    
        var schedule = [];
        
        var day = fromDay;
        
        do{
            schedule.push(getEmptyDay(day.toDate()));
            
           day.add(1, 'day');
            
        } while(!day.isSame(upToDay))
        
        return schedule;
    }
    
    var getSchedule = function(fromDay, upToDay, scheduleDays){
        
        var schedule = [];
        var currentDay = fromDay;
        var i = 0;
        
        do{
            var scheduleDay = scheduleDays[i];
            
            var scheduleDayDate = new Date(scheduleDay.day);
            
            // get the start of day moment for the scheduleDay
            var scheduleDayMoment = moment(scheduleDayDate).startOf('day');
            
            if(currentDay.isBefore(scheduleDayMoment)){
                
                schedule.push(getEmptyDay(currentDay.toDate()));
                
                // Add a day to the current day
                currentDay.add(1, 'day');
                
                // and try again
                continue;
            }
            
            // Add the db model to the schedule
            schedule.push(scheduleDay)
            
            i++;
            
            // TODO: This can be handled more elegantly without adding the model
            if(scheduleDays.length == i){
                // Add a fake dbmodel with a day beyond the upto day to the array
                scheduleDays.push(getEmptyDay(upToDay.add(1, 'day').toDate()));
            }
            
            currentDay.add(1, 'day');
            
        } while(!currentDay.isSame(upToDay))
        
        return schedule;
    }
    
    router.route("/scheduledays")
        .get(function(req, res) {
            
            var from = new Date(req.query.from);
            var upTo = new Date(req.query.upto);
            
            var fromDay = moment(from).startOf('day');
            var upToDay = moment(upTo).startOf('day');
            
            var dayQuery = getDayQuery(from, upTo);
            
            ScheduleDay
                .find(dayQuery)
                .populate('recipe', 'name')
                .exec(function(err, scheduleDays) {
                    
                    if (err){
                        res.send(err);
                    }
        
                    if(scheduleDays.length == 0){
                        res.json(getEmptySchedule(fromDay, upToDay));
                        return;
                    }
        
                    res.json(getSchedule(fromDay, upToDay, scheduleDays));
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
