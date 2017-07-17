<?php
/**
 * Meta provider
 * @package post-search
 * @version 0.0.1
 * @upgrade true
 */

namespace PostSearch\Meta;

class PostSearch
{
    static function index(){
        $dis = \Phun::$dispatcher;
        
        $base_url   = $dis->router->to('siteHome');
        
        $meta_title = $dis->setting->post_search_meta_title;
        $meta_desc  = $dis->setting->post_search_meta_description;
        $meta_keys  = $dis->setting->post_search_meta_keywords;
        $meta_url   = $dis->router->to('sitePostSearch');
        $meta_image = $base_url . 'theme/site/static/logo/500x500.png';
        
        $index = (object)[
            '_schemas' => [],
            '_metas'   => [
                'title'         => $meta_title,
                'canonical'     => $meta_url,
                'description'   => $meta_desc,
                'keywords'      => $meta_keys,
                'image'         => $meta_image,
                'type'          => 'website'
            ]
        ];
        
        // Schema
        $schema = [
            '@context'      => 'http://schema.org',
            '@type'         => 'SearchResultsPage',
            'name'          => $meta_title,
            'description'   => $meta_desc,
            'publisher'     => [
                '@type'         => 'Organization',
                'name'          => $dis->config->name,
                'url'           => $base_url,
                'logo'          => $meta_image
            ],
            'url'           => $meta_url,
            'image'         => $meta_image
        ];
        
        $index->_schemas[] = $schema;
        
        // schema breadcrumbs
        $second_item = [
            '@type' => 'ListItem',
            'position' => 2,
            'item' => [
                '@id' => $base_url . '#post',
                'name' => $dis->setting->post_index_meta_title
            ]
        ];
        
        if($dis->setting->post_index_enable){
            $second_item = [
                '@type' => 'ListItem',
                'position' => 2,
                'item' => [
                    '@id' => $dis->router->to('sitePost'),
                    'name' => $dis->setting->post_index_meta_title
                ]
            ];
        }
        
        $schema = [
            '@context'  => 'http://schema.org',
            '@type'     => 'BreadcrumbList',
            'itemListElement' => [
                [
                    '@type' => 'ListItem',
                    'position' => 1,
                    'item' => [
                        '@id' => $base_url,
                        'name' => $dis->config->name
                    ]
                ],
                $second_item
            ]
        ];
        
        $index->_schemas[] = $schema;
        
        return $index;
    }
}