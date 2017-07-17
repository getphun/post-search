<?php
/**
 * post-search config file
 * @package post-search
 * @version 0.0.1
 * @upgrade true
 */

return [
    '__name' => 'post-search',
    '__version' => '0.0.1',
    '__git' => 'https://github.com/getphun/post-search',
    '__files' => [
        'modules/post-search/config.php'        => [ 'install', 'remove', 'update' ],
        'modules/post-search/_db'               => [ 'install', 'remove', 'update' ],
        'modules/post-search/meta'              => [ 'install', 'remove', 'update' ],
        'theme/site/static/js/post-search.js'   => [ 'install', 'remove', 'update' ],
        'modules/post-search/controller'        => [ 'install', 'remove' ],
        'theme/site/post/search'                => [ 'install', 'remove' ]
    ],
    '__dependencies' => [
        'site',
        'post',
        'site-param'
    ],
    '_services' => [],
    '_autoload' => [
        'classes' => [
            'PostSearch\\Controller\\SearchController' => 'modules/post-search/controller/SearchController.php',
            'PostSearch\\Meta\\PostSearch'             => 'modules/post-search/meta/PostSearch.php'
        ],
        'files' => []
    ],
    '_routes' => [
        'site' => [
            'sitePostSearch' => [
                'rule' => '/post/search',
                'handler' => 'PostSearch\\Controller\\Search::index'
            ]
        ]
    ]
];