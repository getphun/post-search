var PS;

PS = {
    el: {
        resultTotal: null,
        resultList : null,
        resultPager: null,
        resultLoader: null
    },
    opt: {
        key     : null,
        cx      : null,
        q       : null,
        page    : 1,
        maxPage : 1000
    },
    template: {
        item  : null,
        pager : null
    },
    
    init: function(){
        PS.el.resultTotal = $('#post-search-result-total');
        PS.el.resultList  = $('#post-search-result-list');
        PS.el.resultPager = $('#post-search-result-pager');
        PS.el.resultLoader= $('#post-search-result-loader');
        PS.el.resultError = $('#post-search-result-error');
        PS.el.script      = $('#post-search-script');
        
        PS.template.item  = $('#post-search-template-item').html();
        PS.template.pager = $('#post-search-template-page-item').html();
        
        PS.opt.key = PS.el.script.data('key');
        PS.opt.cx  = PS.el.script.data('cx');
        
        if(~location.search.indexOf('q=')){
            var qs = location.search.match(/q=([^&])/);
            if(!qs[1])
                return;
            PS.opt.q = qs[1];
            PS.find();
        }
    },
    
    find: function(page, q){
        if(q)
            PS.opt.q = q;
        if(page)
            PS.opt.page = page;
        
        var src = 'https://www.googleapis.com/customsearch/v1'
                + '?key=' + PS.opt.key
                + '&cx=' + PS.opt.cx
                + '&q=' + PS.opt.q
                + '&start=' + (((PS.opt.page-1)*10)+1)
                + '&callback=PS.render';
        
        var script = document.createElement('script');
        script.src = src;
        
        PS.el.resultLoader.show();
        PS.el.resultList.hide();
        PS.el.resultPager.hide();
        PS.el.resultTotal.hide();
        
        document.body.append(script);
    },
    
    render: function(result){
        PS.el.resultLoader.hide();
        
        if(result.error){
            PS.el.resultError.show();
            PS.el.resultError.html('The default google custom search will be here');
            
            return;
        }
        
        PS.el.resultList.show();
        PS.el.resultPager.show();
        PS.el.resultTotal.show();
        
        PS.el.resultTotal.html(result.searchInformation.formattedTotalResults);
        
        for(var i=0; i<result.items.length; i++){
            var item = result.items[i];
            var dtx = {
                    title: item.title,
                    link : item.link,
                    snippet: item.snippet,
                    htmlSnippet: item.htmlSnippet,
                    image: item.pagemap.cse_image[0].src
                };
            
            var it = PS.template.item;
            for(var k in dtx){
                var re = new RegExp('#'+k+'#', 'g');
                it = it.replace(re, dtx[k]);
            }
            
            PS.el.resultList.append(it);
        }
        
        PS.renderPager(result.searchInformation.totalResults);
    },
    
    renderPager: function(total){
        var pages = Math.ceil( total / 10 );
        var page  = PS.opt.page;
        
        PS.opt.maxPage = pages;
        
        var pageStart = page - 5;
        if(pageStart < 1)
            pageStart = 1;
        var pageEnd = pageStart + 9;
        if(pageEnd > pages)
            pageEnd = pages;
        
        if((pageEnd - pageStart) < 9){
            pageStart = pageEnd - 9;
            if(pageStart < 1)
                pageStart = 1;
        }
        
        var pagePrev = page - 1;
        if(pagePrev < 1)
            pagePrev = 1;
        var nextPage = page + 1;
        if(nextPage > pages)
            nextPage = pages;
        
        PS.el.resultPager.html('');
        
        PS.renderPagerItem('Prev', pagePrev, page == pagePrev);
        for(var i=pageStart; i<=pageEnd; i++)
            PS.renderPagerItem(i, i, page == i);
        PS.renderPagerItem('Next', nextPage, page == nextPage);
    },
    
    renderPagerItem: function(label, page, active){
        var el = $(PS.template.pager);
        el.find('.cse-label').html(label);
        if(active){
            if(el.hasClass('cse-is-active'))
                el.addClass('active');
            else
                el.find('.cse-is-active').addClass('active');
        }
        el.find('.cse-event')
            .data('page', page)
            .attr('href', '#'+page)
            .click(function(){
                var page = $(this).data('page');
                PS.find(page);
                return false;
            });
        
        PS.el.resultPager.append(el);
    }
};

PS.init();