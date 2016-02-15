module.exports = {
    
    create : function(date){
        
        var ScheduleDay = require("../models/scheduleDay");
            
        var emptyDay = new ScheduleDay();
                                
        emptyDay.day = new Date(date);
        
        return emptyDay;
    }
}