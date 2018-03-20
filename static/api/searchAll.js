(function(mui) {
    var sort = getUrlParam('sort') || '0';
    var searchInfo = getUrlParam('searchdata');
    var searchFlag = getUrlParam('flag');
    var page = 0;
    var sort;
    var $grid;
    $('#searchProduct').val(searchInfo);
    $('title').text(searchInfo);
    $grid = $('.wall-content').masonry({
        itemSelector: '.waterfall',
        percentPosition: true
    }); 
    
    loading ();
    reLoad ();
    mui('body').on('tap','a',function(){document.location.href=this.href;});
    // mui('body').on('tap','.price-box',function(){
    //     if ($('.icon-xiangshangjiantou-copy-copy-copy-copy').hasClass('activesave') == false && $('.icon-xiangshangjiantou-copy-copy-copy').hasClass('activesave') == false) {
    //         $('.icon-xiangshangjiantou-copy-copy-copy').addClass('activesave');
    //         sort = 2;
    //         page = 0;
    //         $('.waterfall').each(function(index, el) {
    //             $grid.masonry( 'remove', $(this)).masonry('layout');;
    //         });
    //         mui('#pullrefresh').pullRefresh().refresh(true);
    //         mui('#pullrefresh').pullRefresh().pullupLoading();
    //         mui('.mui-scroll-wrapper').pullRefresh().scrollTo(1, 1, 100);
    //     } else if ($('.icon-xiangshangjiantou-copy-copy-copy').hasClass('activesave') == true) {
    //         $('.rank-jiantou2 > span').each(function(index, el) {
    //             $(this).removeClass('activesave');
    //         });
    //         $('.icon-xiangshangjiantou-copy-copy-copy-copy').addClass('activesave');
    //         sort = 1;
    //         page = 0;
    //         $('.waterfall').each(function(index, el) {
    //             $grid.masonry( 'remove', $(this)).masonry('layout');;
    //         });
    //         mui('#pullrefresh').pullRefresh().refresh(true);
    //         mui('#pullrefresh').pullRefresh().pullupLoading();
    //         mui('.mui-scroll-wrapper').pullRefresh().scrollTo(1, 1, 100);
    //     } else if ($('.icon-xiangshangjiantou-copy-copy-copy-copy').hasClass('activesave') == true) {
    //         $('.rank-jiantou2 > span').each(function(index, el) {
    //             $(this).removeClass('activesave');
    //         });
    //         $('.icon-xiangshangjiantou-copy-copy-copy').addClass('activesave');
    //         sort = 2;
    //         page = 0;
    //         $('.waterfall').each(function(index, el) {
    //             $grid.masonry( 'remove', $(this)).masonry('layout');;
    //         });
    //         mui('#pullrefresh').pullRefresh().refresh(true);
    //         mui('#pullrefresh').pullRefresh().pullupLoading();
    //         mui('.mui-scroll-wrapper').pullRefresh().scrollTo(1, 1, 100);
    //     }
        
    // });
    // mui('body').on('tap','.rank-sales',function(){
    //     $('.rank-jiantou2 > span').each(function(index, el) {
    //         $(this).removeClass('activesave');
    //     });
    //     sort = 3;
    //     page = 0;
    //     $('.waterfall').each(function(index, el) {
    //         $grid.masonry( 'remove', $(this)).masonry('layout');;
    //     });
        
    //     mui('#pullrefresh').pullRefresh().refresh(true);
    //     mui('#pullrefresh').pullRefresh().pullupLoading();
    //     mui('.mui-scroll-wrapper').pullRefresh().scrollTo(1, 1, 100);
    // });
    mui('body').on('tap','.price-box',function(){
                $('.search-rank > div > span').removeClass('activesave');
                $(this).children('.rank-price').addClass('activesave');
                if ($('.icon-xiangshangjiantou-copy-copy-copy-copy').hasClass('activesave') == false && $('.icon-xiangshangjiantou-copy-copy-copy').hasClass('activesave') == false) {
                    console.log(1);
                    $('.icon-xiangshangjiantou-copy-copy-copy').addClass('activesave');
                    sort = 2;
                    page = 0;
                    $('.waterfall').each(function(index, el) {
                        $grid.masonry( 'remove', $(this)).masonry('layout');;
                    });
                    mui('#pullrefresh').pullRefresh().refresh(true);
                    mui('#pullrefresh').pullRefresh().pullupLoading();
                    mui('#pullrefresh').pullRefresh().scrollTo(1, 1, 100);
                } else if ($('.icon-xiangshangjiantou-copy-copy-copy').hasClass('activesave') == true) {
                    console.log(2);
                    $('.rank-jiantou2 > span').each(function(index, el) {
                        $(this).removeClass('activesave');
                    });
                    $('.icon-xiangshangjiantou-copy-copy-copy-copy').addClass('activesave');
                    sort = 1;
                    page = 0;
                    $('.waterfall').each(function(index, el) {
                        $grid.masonry( 'remove', $(this)).masonry('layout');;
                    });
                    mui('#pullrefresh').pullRefresh().refresh(true);
                    mui('#pullrefresh').pullRefresh().pullupLoading();
                    mui('#pullrefresh').pullRefresh().scrollTo(1, 1, 100);
                } else if ($('.icon-xiangshangjiantou-copy-copy-copy-copy').hasClass('activesave') == true) {
                    console.log(3);
                    $('.rank-jiantou2 > span').each(function(index, el) {
                        $(this).removeClass('activesave');
                    });
                    $('.icon-xiangshangjiantou-copy-copy-copy').addClass('activesave');
                    sort = 2;
                    page = 0;
                    $('.waterfall').each(function(index, el) {
                        $grid.masonry( 'remove', $(this)).masonry('layout');;
                    });
                    mui('#pullrefresh').pullRefresh().refresh(true);
                    mui('#pullrefresh').pullRefresh().pullupLoading();
                    mui('#pullrefresh').pullRefresh().scrollTo(1, 1, 100);
                }
            });
            // 销量排序
            mui('body').on('tap','.sales-box',function(){
                $('.search-rank > div > span').removeClass('activesave');
                $('.rank-price').removeClass('activesave');
                $(this).children('.rank-sales').addClass('activesave');
                $('.rank-jiantou2 > span').each(function(index, el) {
                    $(this).removeClass('activesave');
                });
                sort = 3;
                page = 0;
                $('.waterfall').each(function(index, el) {
                    $grid.masonry( 'remove', $(this)).masonry('layout');;
                });
                mui('#pullrefresh').pullRefresh().refresh(true);
                mui('#pullrefresh').pullRefresh().pullupLoading();
                mui('#pullrefresh').pullRefresh().scrollTo(1, 1, 100);
            });
    function loading () {
        $('#searchProduct').val(searchInfo);
        $('#searchBtn').on('click',function(){
        var searchText = $('#searchProduct').val();
        if ( searchText == '') {
            $('#searchProduct').blur();
            mui.toast("Please enter keywords!");
        } else {
            window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + searchFlag;
        }
        });
        $('#searchAllForm').submit(function(event) {
        var searchText = $('#searchProduct').val();
        if ( searchText == '') {
            $('#searchProduct').blur();
            mui.toast("Please enter keywords!");
        } else {
            window.location.href = './search-all.html?searchdata=' + searchText + '&flag=' + searchFlag;
        }
        });
    }

    function reLoad () {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                up: {
                    auto:true,
                    offset:'0px',
                    contentrefresh : "Loading…",
                    callback: pullupRefresh,
                }
            }
        });
        
        function pullupRefresh() {
            ++page;
            $.ajax({
                url: csOrzs + '/Api/Archive/getList',
                type: 'GET',
                data: {
                    'cat_id': searchFlag,
                    'pageSize': '8',
                    'search_name': searchInfo,
                    'p': page,
                    'sort': sort
                },
            })
            .done(function(response) {
                console.log(sort)
                console.log(response);
                var categoryData = response;
                var totalPages = categoryData.data.totalPages;
                var dataList = categoryData.data.goods;
                if (response.code == 0) {
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    mui.toast("Sorry, we couldn't find a match for your search!");
                } else if (response.code == 1) {
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh((page == totalPages || totalPages == 0));
                    var categorysList2 = {"categorysList":dataList};
                    var categorysHtml = template('categorys', categorysList2);
                    var dataHtml = $(categorysHtml);
                    console.log($grid);
                    $grid.append( dataHtml ).masonry( 'appended', dataHtml );
                    $grid.imagesLoaded().progress( function() {
                        $grid.masonry();
                    });   

                } else {
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    mui.toast("Network error, please try again!");
                }
                
            })
            .fail(function() {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                mui.toast("Network error, please try again!");
            });
        }
    }

    function getUrlParam(key){
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }
})(mui);