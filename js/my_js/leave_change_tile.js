// 离开当前员面时修改网页标题，回到当前页面时恢复原来标题

window.onload = function () {
    let originTitile = document.title;
    let originIconHref = $('[rel="icon"]').attr("href");
    let originShortCutIconHref = $('[rel="shortcut icon"]').attr("href");
    let titleTime;
    document.addEventListener('visibilitychange', function () {
        let isHidden = document.hidden;

        if (isHidden) {
            $('[rel="icon"]').attr('href', "/images/my_ico/panda.ico");
            $('[rel="shortcut icon"]').attr('href', "/images/my_ico/panda.ico");
            document.title = "看不到我了(=´ω｀=)";

            clearTimeout(titleTime);
        } else {
            $('[rel="icon"]').attr('href', "/images/my_ico/panda_kiss.ico");
            $('[rel="shortcut icon"]').attr('href', "/images/my_ico/panda_kiss.ico");
            document.title = "我又回来了(*￣∇￣*) ";

            titleTime = setTimeout(function () {
                document.title = originTitile;
                $('[rel="icon"]').attr('href', originIconHref);
                $('[rel="shortcut icon"]').attr('href', originShortCutIconHref);
            }, 3000);
        }
    })
}