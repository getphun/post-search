window.PS = {
    _key: null,
    _cx : null,
    _cb : function(){},
    
    init: function(opt){
        PS._key = opt.key;
        PS._cx  = opt.cx;
    },
    
    done: function(result){
        var err = result.error;
        var res = {
            total: 0,
            pages: 0,
            items: result.items || []
        };
        
        if(!err){
            res.total = result.searchInformation.totalResults;
            res.total = parseInt(res.total);
            if(res.total)
                res.pages = Math.ceil( res.total / 10 );
        }
        
        PS._cb(err, res);
    },
    
    find: function(q,p,cb){
        if(cb)
            PS._cb = cb;
        
        var src = 'https://www.googleapis.com/customsearch/v1'
                + '?key=' + PS._key
                + '&cx='  + PS._cx
                + '&q='   + q
                + '&start=' + (((p-1)*10)+1)
                + '&callback=PS.done';

        var script = document.createElement('script');
        script.src = src;
        $(document.body).append(script);
    }
};