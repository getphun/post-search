<?php
/**
 * Post search controller
 * @package post-search
 * @version 0.0.1
 * @upgrade false
 */

namespace PostSearch\Controller;
use PostSearch\Meta\PostSearch as _PSearch;

class SearchController extends \SiteController
{
    public function indexAction(){
        if(!$this->setting->post_search_gce_key || !$this->setting->post_search_gce_cx){
            if(is_dev())
                deb('Site setting named `post_search_gce_cx` and `post_search_gce_key` is required');
            return $this->show404();
        }
        $cache= 60*60*24*7;
        
        $params = [
            'index' => new \stdClass()
        ];
        
        $params['index']->meta = _PSearch::index();
        
        $this->respond('post/search/index', $params, $cache);
    }
}