const request = require("request-promise")
const $ = require("cheerio")

const start = async () => {
    try {
        const lastLinkHtml = await request("https://foros.3dgames.com.ar/threads/942062-ofertas-online-argentina");
        const linkUrl = $('.first_last > a', lastLinkHtml)
        // console.log('linkUrl', linkUrl)
        const last = 7167;
        const links = new Set();
        for( var l = last; l > last - 20 ; l--) {
            const html = await request(`https://foros.3dgames.com.ar/threads/942062-ofertas-online-argentina/page${l}`);
            const posts = $('div.content', html);
            for (var i = 0; i < posts.length; i++) {
                const postLinks = $('a', posts[i]);
                for (var j = 0; j < postLinks.length; j++) {
                    if (!postLinks[j].attribs.href.includes('showthread') && !postLinks[j].attribs.href.includes('foros')) links.add(postLinks[j].attribs.href)
                }
            }
        }



        console.log(links)

    } catch (error) {
        console.log(error)
    }

}

start()