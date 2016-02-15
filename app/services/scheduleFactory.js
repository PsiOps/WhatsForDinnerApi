module.exports = {
    
    create : function(fromDay, upToDay, scheduleDays){
        
        var emptyDayFactory = require("./emptyDayFactory");
        var moment = require('moment');
        
        var schedule = [];
        var currentDay = fromDay;
        var i = 0;
        
        do{
            var scheduleDay = scheduleDays[i];
            
            var scheduleDayDate = new Date(scheduleDay.day);
            
            // get the start of day moment for the scheduleDay
            var scheduleDayMoment = moment(scheduleDayDate).startOf('day');
            
            if(currentDay.isBefore(scheduleDayMoment)){
                
                schedule.push(emptyDayFactory.create(currentDay.toDate()));
                
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
                scheduleDays.push(emptyDayFactory.create(upToDay.add(1, 'day').toDate()));
            }
            
            currentDay.add(1, 'day');
            
        } while(!currentDay.isSame(upToDay))
        
        return schedule;
    },
    
    createEmpty : function(fromDay, upToDay){
    
        var emptyDayFactory = require("./emptyDayFactory");
        var schedule = [];
        
        var day = fromDay;
        
        do{
            schedule.push(emptyDayFactory.create(day.toDate()));
            
           day.add(1, 'day');
            
        } while(!day.isSame(upToDay))
        
        return schedule;
    }
}