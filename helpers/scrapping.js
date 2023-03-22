const puppeteer = require('puppeteer-extra')

const pluginStealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(pluginStealth())

const fetchOpinions = async (title, year) => {
    const urlRT = 'https://www.rottentomatoes.com/search?search=';
    const titulo = title.replaceAll(' ', '_').toLowerCase();
    title = title.replaceAll('+', '%20');
    const anio = `(${year})`;

    try {

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1600,900", "--single-process"],
        });
        console.log('Starting puppeteer...');

        const page = await browser.newPage();
        console.log('Going to...' + `${urlRT}${title}`);
        await page.goto(`${urlRT}${title}`);

        console.log('cookies');
        await page.click('#onetrust-accept-btn-handler');
        // await page.waitForTimeout(1000);

        let link;
        const selST = '#search-results > search-page-result:nth-child(3) > ul a:nth-child(2)';
        const dataST = await page.$$eval(selST, dataST => dataST.map(st =>
            link = {
                texto: st.innerText.toLowerCase().trim(),
                href: st.href
            }));

        const dataSY = await page.$$('pierce/.year');
        const spn = await Promise.all(dataSY.map(dataSY =>
            dataSY.evaluate(element => element.textContent.trim())));

        let x = 0;
        let foundIt = false;
        do {
            if (title == dataST[x].texto && spn[x] == anio) foundIt = true;
            console.log('x:', x, 'title:', title, 'dataST ' + x, dataST[x].texto, 'anio', anio, 'spn ' + x, spn[x])
            x++;
        } while (!foundIt && x < dataST.length)
        if (!foundIt) {
            console.log('No se encontró la película, intentando por otro lado...', titulo)
            const selTitulo = '#search-results > search-page-result:nth-child(3) > ul a:nth-child(2)'//'a.unset';
            await page.waitForSelector(selTitulo);
            const data = await page.$$eval(selTitulo,
                data => data.map(tit => tit.href))

            const selLink = 'https://www.rottentomatoes.com/m/' + titulo;
            link = data.find(tit => tit == selLink);
            if (!link) return {
                ok: false,
                msg: 'Error: No se encontró la película.'
            }
        } else link = dataST[x - 1].href;

        console.log('redireccionando a movie => ', link)
        await page.goto(link);
        console.log('redireccionando a opiniones => ', link + '/reviews?sort=fresh')
        await page.goto(link + '/reviews?sort=fresh');

        console.log('recopilando datos...')
        const selOpinionsA = 'a.display-name';
        await page.waitForSelector(selOpinionsA);
        const opinionWrt = await page.$$eval(selOpinionsA, opinionWrt => opinionWrt.map(w => w.innerText))
        // console.log('writers', opinionWrt)

        const selOpinions = 'p.review-text';
        await page.waitForSelector(selOpinions);
        const opinions = await page.$$eval(selOpinions, opinions => opinions.map(o => o.textContent))
        // console.log('opinions', opinions)

        const selOpinionsFR = 'a.full-url';
        await page.waitForSelector(selOpinions);
        const opinionsFR = await page.$$eval(selOpinionsFR, opinionsFR => opinionsFR.map(fr => fr.href))
        // console.log('opinionsFR', opinionsFR);

        const selOpinionsDate = 'p.original-score-and-url span';
        await page.waitForSelector(selOpinions);
        const opinionsDate = await page.$$eval(selOpinionsDate, opinionsDate => opinionsDate.map(dt => dt.textContent))
        // console.log('opinionsDate', opinionsDate);

        console.log('exportando datos...')
        const rslt = [];
        for (i = 0; i < opinions.length; i++) {
            rslt.push({
                opinion: opinions[i],
                escritor: opinionWrt[i],
                url: opinionsFR[i],
                fecha: opinionsDate[i]
            })
        }

        console.log('Closing browser...')
        await browser.close()

        return {
            ok: true,
            data: rslt
        };

    } catch (e) {
        return {
            ok: false,
            error: e.stack
        }
    }

}


module.exports = { fetchOpinions }