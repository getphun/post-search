# post-search

Pencarian post dengan menggunakan google custom search.

Module ini membutuhkan dua site param yaitu:

1. post_search_gce_key  
   API Key gcs, silahkan mengacu pada [ Custom Search JSON/Atom API ](https://developers.google.com/custom-search/json-api/v1/overview)
   untuk informasi mengambil nilai key.
1. post_search_gce_cx  
   Nilai ini ada di code google custom search.

## Instalasi

Tambahkan script js milik module post-search, dan jquery pastinya:

```php
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="<?= $this->asset('js/post-search.js') ?>"></script>
```

## Penggunaan

Panggil fungsi `PS.find(query, page, callback)` dari script site untuk mendapatkan
hasil pencarian:

```js
var qs = location.search.match(/q=([^&]+)/);
if(!qs[1])
    return; // no query provided by uri

var page = 1;

PS.init({
    key: 'AIzaSyA...',
    cx : '004360...:-wk...'
});
PS.find(qs[1], page, function(err, res){
    // Proses res
});
```

## callback

Argument callback akan dipanggil dengan dua parameter, yaitu:

1. err  
   Informasi jika request error. Pada level ini, aplikasi bisa mengambil tindakan
   yang benar seperti menampilkan pesan error, atau balik menggunakan standar 
   google custom script script ketika rate limit pencarian tercapai.
1. res  
   Jika semuanya berjalan dengan baik, argumen ini akan diisi dengan nilai seperti
   di bawah:

```json
{
    "total": 25,
    "pages": 3,
    "items": [
        {
            "kind": "customsearch#result",
            "title": "Tabrak Balita Hingga Tewas, Oknum Polisi Menggunakan ...",
            "htmlTitle": "Tabrak Balita Hingga Tewas, Oknum \u003cb\u003e...",
            "link": "http://example.com/post/read/tabrak-balita-hingga-tewas",
            "displayLink": "example.com",
            "snippet": "12 Sep 2016 ... Citra Polisi kembali tercoreng...",
            "htmlSnippet": "12 Sep 2016 \u003cb\u003e...\u003c/b\u003e ...",
            "cacheId": "bPPyXFjgZc8J",
            "formattedUrl": "example.com/.../tabrak-balita-hingga-tewas",
            "htmlFormattedUrl": "example.com/.../tabrak-balita-hingga-tewas",
            "pagemap": {
                "cse_thumbnail": [
                    {
                        "width": "299",
                        "height": "168",
                        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, minimum-scale=1, ...",
                        "fb:app_id": "562964030524726",
                        "fb:pages": "158361354500249",
                        "msvalidate.01": "C7089F9FA16B9CD02FFBA9F80963A3D9",
                        "og:site_name": "MrSeru",
                        "article:modified_time": "2016-09-17T05:52:58+07:00",
                        "article:published_time": "2016-09-12T10:04:54+07:00",
                        "article:publisher": "158361354500249",
                        "article:section": "Polisi",
                        "og:description": "Citra Polisi kemba tercoreng di ...",
                        "og:image": "http://example.com/media/73/d0/bd73d0.jpg",
                        "og:title": "Tabrak Balita Hingga Tewas, Oknum Polisi",
                        "og:type": "article",
                        "og:url": "http://example.com/post/read/tabrak-balita",
                        "og:updated_time": "2016-09-17T05:52:58+07:00",
                        "twitter:card": "summary_large_image",
                        "twitter:description": "Citra Polisi kemi tercoreng...",
                        "twitter:image:src": "http://example.com/me3/d0/5f.jpg",
                        "twitter:title": "Tabrak Balita Hingga Tewas, Oknum ",
                        "twitter:url": "http://example.com/post/read/tabraka..."
                    }
                ],
                "cse_image": [
                    {
                        "src": "http://example.com/media/bd/73/d0/bd73d0b74.jpg"
                    }
                ]
            }
        }
    ]
}
```