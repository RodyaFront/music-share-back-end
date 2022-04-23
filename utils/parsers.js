import puppeteer from 'puppeteer'
import cheerio from "cheerio";

export async function parseYoutubeMusic(url) {
    const LAUNCH_PUPPETEER_OPTS = {
        headless: true,
        slowMo: 200,
    }

    const sections = {
        name: '.title.style-scope.ytmusic-player-bar',
        description: '.subtitle.style-scope.ytmusic-player-bar',
        songText: '.non-expandable.description.style-scope.ytmusic-description-shelf-renderer',
        time: '.time-info.style-scope.ytmusic-player-bar',
        textButtonElement: '.tab-header.style-scope.ytmusic-player-page',
        previewImage: '.style-scope.yt-img-shadow',
    }

    try{
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/61.0.3163.100');
        await page.setViewport({width:960,height:768});

        await page.goto(url, {timeout: 40000, waitUntil: 'networkidle2'});
        const navs = await page.$$(sections.textButtonElement)
        await navs[1].click()

        const content = await page.content()
        const $ = cheerio.load(content)

        const name = $(sections.name)
        const description = $(sections.description)
        const time = $(sections.time)
        const songText = $(sections.songText)
        const previewImage = $(sections.previewImage)

        const data = {
            name: await name.text().trim(),
            description: await description.text().trim(),
            songText: await songText.text().split(' / ')[1],
            time: await time.text().trim(),
            previewImage: previewImage.attr('src'),
        }

        browser.close()

        return data

    }catch(err) {
        throw err
    }
}