const request = require("request-promise")
const $ = require("cheerio")

const start = async () => {
    try {
        const html = await request("https://foros.3dgames.com.ar/threads/942062-ofertas-online-argentina/page7132");
        const posts = $('div.content', html);

        // const $ = cheerio.load(html)
        console.log("***", posts.length)
        const links = []

        for (var i = 0; i < posts.length; i++) {
            const postLinks = $('a', posts[i]);
            for (var j = 0; j < postLinks.length; j++) {
                if (!postLinks[j].attribs.href.includes('showthread') && !postLinks[j].attribs.href.includes('foros')) links.push({
                    href: postLinks[j].attribs.href
                })
            }
        }
        console.log(links)

    } catch (error) {
        console.log(error)
    }

}

start()