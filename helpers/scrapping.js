const puppeteer = require('puppeteer-extra');

const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

const fetchOpinionsSC = async (title, year, noShow = true, log = false, limit = 2) => {

    const urlRT = 'https://www.sensacine.com/buscar/?q=';
    title = title.replaceAll('+', '%20').replaceAll(' ', '%20');
    let link, x = 0, oyNum = 0;
    let foundIt = false, onlyYear = false;

    try {
        //Comienza el proceso
        if (log) console.log('Fetching opinions from SensaCine...');
        const browser = await puppeteer.launch({
            headless: noShow,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,1024", "--single-process"],
        });

        //Abriendo la web de SensaCine
        if (log) console.log('Going to: ' + `${urlRT}${title}`);
        const page = await browser.newPage();
        await page.goto(`${urlRT}${title}`);

        //Mensaje de las cookies
        if (log) console.log('Waiting for cookies...');
        await page.click('#didomi-notice-agree-button');

        //Esperando selectores para buscar el titulo y año de la película
        if (log) console.log('Obtaining selectors...');
        const listaMovies = '#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul h2 > a';
        await page.waitForSelector(listaMovies);
        const movies = await page.$$eval(listaMovies, movies => movies.map(m =>
            link = { texto: m.innerText, href: m.href }));

        const listaAnios = '#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul  div.meta-body-item.meta-body-info > span.date';
        await page.waitForSelector(listaAnios);
        let anios = await page.$$eval(listaAnios, anios => anios.map(a => a.innerText.substring(a.innerText.length - 4)));

        //Compara la información de los selectores con el título y año de la película
        do {
            if (title == movies[x].texto && anios[x] == year) foundIt = true;
            if (anios[x] == year) {
                oyNum = x;
                onlyYear = true;
            }
            x++;
        } while (!foundIt && x < movies.length);

        //Si no se encuentró un match directo... busca coincidir sólo el año y si no, finalmente la 
        //primera referencia de la lista
        if (!foundIt) {
            if (onlyYear) link = movies[oyNum].href;
            else link = movies[0].href;
        } else link = movies[x - 1].href;

        //Redireccionando a la web de opiniones
        if (log) console.log('Redirecting to opinions:', link + 'criticas-espectadores/');
        await page.goto(link + 'criticas-espectadores/');

        //Esperando los selectores para obtener las opiniones (autor, fecha, opinion)
        if (log) console.log('Fetching data...');
        const selOpinions = 'div.content-txt.review-card-content';
        await page.waitForSelector(selOpinions);
        const opinions = await page.$$eval(selOpinions, opinions => opinions.map(o => o.innerText));

        const selOpinionsDate = 'span.review-card-meta-date';
        await page.waitForSelector(selOpinions);
        const opinionsDate = await page.$$eval(selOpinionsDate, opinionsDate => opinionsDate.map(dt => dt.innerText));

        //Se comprueba si el autor esta registrado o es anónimo
        //Registrado:
        let selOpinionsA = 'div.review-card-aside > div > div > div > a.xXx';
        let opinionWrt = await page.$$eval(selOpinionsA, opinionWrt => opinionWrt.map(w =>
            dato = { texto: w.innerText, href: w.href }
        ));
        //Anónimo
        let simple = false;
        if (opinionWrt.length == 0) {
            simple = true;
            selOpinionsA = 'div.review-card-aside > div > div > div > span';
            opinionWrt = await page.$$eval(selOpinionsA, opinionWrt => opinionWrt.map(w => w.innerText));
        }

        //Se limita la cantidad de resultados
        if (log) console.log('Exporting data...');
        const hasta = opinions.length >= limit ? limit : opinions.length;

        //Se almacenan las opiniones en un array para exportarlo
        const rslt = [];
        for (i = 0; i < hasta; i++) {
            if (!simple) rslt.push({
                opinion: opinions[i],
                escritor: opinionWrt[i].texto,
                url: opinionWrt[i].href,
                fecha: opinionsDate[i]
            })
            else rslt.push({
                opinion: opinions[i],
                escritor: opinionWrt[i],
                url: '',
                fecha: opinionsDate[i]
            })
        }

        //Se cierra el navegador. Proceso completado
        if (log) console.log('Closing browser...');
        await browser.close();

        return {
            ok: true,
            data: rslt
        };

    } catch (e) {
        return {
            ok: false,
            error: e.stack
        };
    }
}



const fetchOpinionsRT = async (title, year, noShow = true, log = false, limit = 2) => {

    const urlRT = 'https://www.rottentomatoes.com/search?search=';
    const titleSearch = title.replaceAll(' ', '_').toLowerCase();
    title = title.replaceAll('+', '%20').replaceAll('+ ', '%20');
    const yearSearch = `(${year})`;

    let x = 0;
    let foundIt = false;
    let link;

    try {
        //Comienza el proceso
        if (log) console.log('Fetching opinions from RotterTomatoes...');
        const browser = await puppeteer.launch({
            headless: noShow,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1600,900", "--single-process"],
        });

        //Abriendo la web de RottenTomatoes
        const page = await browser.newPage();
        if (log) console.log('Going to: ' + `${urlRT}${title}`);
        await page.goto(`${urlRT}${title}`);

        //Mensaje de las cookies
        if (log) console.log('Waiting for cookies...');
        await page.click('#onetrust-accept-btn-handler');

        //Esperando selectores para buscar el titulo y año de la película
        const selST = '#search-results ul a.unset';
        const dataST = await page.$$eval(selST, dataST => dataST.map(st =>
            link = {
                texto: st.innerText.toLowerCase().trim(),
                href: st.href
            }));

        const dataSY = await page.$$('pierce/.year');
        const spn = await Promise.all(dataSY.map(dataSY =>
            dataSY.evaluate(element => element.textContent.trim())));

        //Compara la información de los selectores con el título y año de la película
        do {
            if (title == dataST[x].texto && spn[x] == yearSearch) foundIt = true;
            x++;
        } while (!foundIt && x < dataST.length);
        //Si no se encuentró un match directo... busca coincidir sólo el título 
        if (!foundIt) {
            if (log) console.log('Movie not fount, trying another method:', titleSearch);
            const selTitulo = '#search-results > search-page-result:nth-child(3) > ul a:nth-child(2)';
            const data = await page.$$eval(selTitulo,
                data => data.map(tit => tit.href));

            const selLink = 'https://www.rottentomatoes.com/m/' + titleSearch;
            link = data.find(tit => tit == selLink);
            //Si tampoco hay coincidencia devuelve el mensaje y termina el proceso
            if (!link) return {
                ok: false,
                msg: 'Error: No se encontró la película.'
            }
        } else link = dataST[x - 1].href;

        //Redireccionando a la web de la película
        if (log) console.log('Redirecting to movie:', link);
        await page.goto(link);
        //Redireccionando a la web de opiniones (debe hacerse en 2 pasos para evitar bloqueo)
        if (log) console.log('Redirecting to opinions:', link + '/reviews?sort=fresh');
        await page.goto(link + '/reviews?sort=fresh');

        //Esperando los selectores para obtener las opiniones (autor, fecha, opinion)
        if (log) console.log('Fetching data...');
        const selOpinionsA = 'a.display-name';
        const opinionWrt = await page.$$eval(selOpinionsA, opinionWrt => opinionWrt.map(w => w.innerText));

        const selOpinions = 'p.review-text';
        const opinions = await page.$$eval(selOpinions, opinions => opinions.map(o => o.textContent));

        const selOpinionsFR = 'a.full-url';
        const opinionsFR = await page.$$eval(selOpinionsFR, opinionsFR => opinionsFR.map(fr => fr.href));

        const selOpinionsDate = 'p.original-score-and-url span';
        const opinionsDate = await page.$$eval(selOpinionsDate, opinionsDate => opinionsDate.map(dt => dt.textContent));

        //Se limita la cantidad de resultados
        if (log) console.log('Exporting data...');
        const hasta = opinions.length >= limit ? limit : opinions.length;

        //Se almacenan las opiniones en un array para exportarlo
        const rslt = [];
        for (i = 0; i < hasta; i++) {
            rslt.push({
                opinion: opinions[i],
                escritor: opinionWrt[i],
                url: opinionsFR[i],
                fecha: opinionsDate[i]
            })
        }

        //Se cierra el navegador. Proceso completado
        if (log) console.log('Closing browser...');
        await browser.close();

        return {
            ok: true,
            data: rslt
        };

    } catch (e) {
        return {
            ok: false,
            error: e.stack
        };
    }
}

module.exports = { fetchOpinionsRT, fetchOpinionsSC }