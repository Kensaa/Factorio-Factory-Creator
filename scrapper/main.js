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
    let i = 0;
    //let link = links[64]
    for(let link of links){
        await page.goto(link,{timeout:0})
        await wait(150)
        let craft = await page.evaluate(()=>{
            let $ = window.$;
            let infoDiv = $($('div[class="infobox"] > div[class="tabber tabberlive"] > div[class="tabbertab"] > table > tbody > tr')[1]).find('td')[0]
            if(!infoDiv)return null
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

            let pb = $('div[class="infobox"] > table > tbody ')[0]

            let subs = $(pb).find('tr').toArray()
            let pbindex = null
            let i = 0
            for(let s of subs){
                if(s.className == "border-top"){
                    let title = $($(s).find('td')[0]).find('p').text().trim()
                    if(title == "Produced by")pbindex = i
                }
                i++
            }
            console.log(pbindex);
            let machineName = 'None'
            if(pbindex){
                let lines = $(pb).find('tr').toArray()
                let machines = $(lines[pbindex+1]).find('td > div').toArray()
                let firstMachine = machines.shift()
                machineName = $(firstMachine).find('a')[0].attributes.title.value.trim().replace('1',"").trim()
            }

            

           

            let obj = {...finalItem,time,needed:infos,producedIn:machineName}
            console.log(obj);
            return obj
        })
        if(craft){
            crafts.push(craft)
        }
        i++
        console.log(i+' of '+links.length+' done');
        fs.writeFileSync('crafts.json',JSON.stringify(crafts,null,4))
    }
}

main();

const wait = (millis) =>
  new Promise((resolve) => setTimeout(resolve, millis))

