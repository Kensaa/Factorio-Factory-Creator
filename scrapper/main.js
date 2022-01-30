const puppeteer = require('puppeteer');
const fs = require('fs')

async function main(){
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://wiki.factorio.com/Main_Page")


    let links = await page.evaluate(()=>{
        let links = []
        let $ = window.$;
        let itemtabs = $('div[id="mw-content-text"] > div > table[style="width: 100%; border-spacing: 8px; margin-top: -8px;"] > tbody > tr > td > div[style="padding-left: 1em;"] > div > div').toArray()
        itemtabs.shift()

        for(let tab of itemtabs){
            let rows = $(tab).find('div').toArray();
            for(let row of rows){
                let items = $(row).find('div').toArray();
                for(let item of items){
                    let l = $(item).find('a')[0]
                    links.push(l.href)
                }
            }
        }

        return links
    })

    fs.writeFileSync('links.json',JSON.stringify(links,null,4))
    let crafts = []
    for(let link of links){
        await page.goto(link)
        let craft = await page.evaluate(()=>{
            let $ = window.$;
            let infoDiv = $($('div[class="infobox"] > div[class="tabber tabberlive"] > div[class="tabbertab"] > table > tbody > tr')[1]).find('td')[0]
            let infos = $(infoDiv).find('div[class="factorio-icon"]').toArray()
            infos = infos.map(e=>{
                let count = parseFloat($(e).find('div').text().trim())
                let attributes = $(e).find('a')[0].attributes
                let item = attributes.title.value.trim()
                let id = attributes.href.value.trim().split('/').pop()
                return {item,count,id}
            })
            let finalItem = infos.pop()
            let time = infos.shift().count

            let pb = $($('div[class="infobox"] > table > tbody > tr').toArray().pop()).find('td > div > a').toArray()
            //console.log(pb);
            let machineName = pb.shift().attributes.title.value.trim().split(' ')
            machineName.pop()
            machineName = machineName.join(' ')

            let obj = {...finalItem,time,needed:infos,producedIn:machineName}
            console.log();
            return obj
        })
        crafts.push(craft)
    }
    fs.writeFileSync('crafts.json',JSON.stringify(crafts,null,4))
}

main();