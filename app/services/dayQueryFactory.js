module.exports = { 
    
    create: function(from, upTo){
        
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
}