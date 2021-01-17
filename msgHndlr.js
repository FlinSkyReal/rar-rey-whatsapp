/*
* Thanks To 
* Allah SWT.
* Rifqi Atha ramadhan
* ArugaZ
* MHANKBARBAR
* IBNUSYAWAL.
* Dll
*/
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const fetch = require('node-fetch')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const { liriklagu, quotemaker, randomNimek, fb, sleep, jadwalTv, ss } = require('./lib/functions')
const { help, snk, info, donate, readme, listChannel } = require('./lib/help')
const { stdout } = require('process')
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (command.startsWith('!')) {
                if (message.length >= 10){
                    return `${message.substr(0, 15)}`
                }else{
                    return `${message}`
                }
            }
        }
            
	    const apakah = [
            'Ya',
            'Tidak',
            'bisa jadi',
            'gak tau',
	    '100% ya',
	    'entah',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
			'hmm mungkin saja',
			'tidak tau pikir aja sendiri',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
	    '5 abad lagi',
            'sabar 5 hari lagi',
	    'tanya aja sama mak lo',
            '1 Tahun lagi'
            ]
			
	const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
			
        const mess = {
            wait: '[WAIT] Sedang di proses silahkan tunggu',
            error: {
                St: '[❗] Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan admin group!',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }
        const apiKey = 'API-KEY' // chat kang jual apikey TN RAR :v
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await client.getHostNumber()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const ownerNumber = ["6281246460730@c.us","55xxxxx"] // replace with your whatsapp number
        const isOwner = ownerNumber.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        //if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        if (isBlocked) return
        //if (!isOwner) return
        switch(command) {
        case '!sticker':
        case '!stiker':
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await client.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    client.reply(from, mess.error.Iv, id)
                }
            } else {
                    client.reply(from, mess.error.St, id)
            }
            break
        case '!stickergif':
        case '!stikergif':
        case '!sgif':
            if (isMedia) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    const mediaData = await decryptMedia(message, uaOverride)
                    client.reply(from, 'Sabar proses', id)
                    const filename = `./media/aswu.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/output.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        const gif = await fs.readFileSync('./media/output.gif', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                    })
                } else (
                    client.reply(from, '[❗] Kirim video dengan caption *!stickerGif* max 5 sec!', id)
                )
            }
            break
	    case '!stickernobg':
        case '!nobg':
	    if (isMedia) {
                try {
                    var mediaData = await decryptMedia(message, uaOverride)
                    var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    var base64img = imageBase64
                    var outFile = './media/img/noBg.png'
                    // untuk api key ambil di web remove.bg
                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'API-KEY', size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch(err) {
                    console.log(err)
                }
            }
            break
		case '!toimg': {
            if(quotedMsg && quotedMsg.type == 'sticker'){
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.sendFile(from, imageBase64, 'imagesticker.jpg', 'sukses gan', id)
            } else if (!quotedMsg) return client.reply(from, 'stiker yg lu bales mana jamed!', id)}
            break				
        case '!donasi':
        case '!donate':
            client.sendLinkWithAutoPreview(from, 'https://saweria.co/donate/helixa', donate)
            break	 
		case '!play'://silahkan jika ingin diubah
		    if (!quotedMsg)
            if (args.length == 0) return client.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: $!play judul lagu`, id)
            axios.get(`https://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`)
            .then(async (res) => {
                await client.sendFileFromUrl(from, `${res.data[0].thumbnail}`, ``, `Lagu ditemukan\n\nJudul: ${res.data[0].title}\nDurasi: ${res.data[0].duration}detik\nUploaded: ${res.data[0].uploadDate}\nView: ${res.data[0].viewCount}\n\nsedang dikirim`, id)
				rugaapi.ytmp3(`https://youtu.be/${res.data[0].id}`)
				.then(async(res) => {
					if (res.status == 'error') return client.sendFileFromUrl(from, `${res.link}`, '', `${res.error}`)
					await client.sendFileFromUrl(from, `${res.thumb}`, '', `Lagu ditemukan\n\nJudul ${res.title}\n\nSabar lagi dikirim`, id)
					await client.sendFileFromUrl(from, `${res.link}`, '', '', id)
					.catch(() => {
						client.reply(from, `URL Ini ${args[0]} Sudah pernah di Download sebelumnya. URL akan di Reset setelah 1 Jam/60 Menit`, id)
					})
				})
            })
            .catch(() => {
                client.reply(from, 'gagal mengunduh file!', id)
            })
            break	
        case '!botstat': {
            const loadedMsg = await client.getAmountOfLoadedMessages()
            const chatIds = await client.getAllChatIds()
            const groups = await client.getAllGroups()
            client.sendText(from, `Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats`)
            break
		}	
        case '!tts':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!tts [id, en, jp, ar] [teks]*, contoh *!tts id halo semua*')
            const ttsId = require('node-gtts')('id')
            const ttsEn = require('node-gtts')('en')
	        const ttsJp = require('node-gtts')('ja')
            const ttsAr = require('node-gtts')('ar')
            const dataText = body.slice(8)
            if (dataText === '') return client.reply(from, '???', id)
            if (dataText.length > 500) return client.reply(from, 'kepanjangan bor!', id)
            var dataBhs = body.slice(5, 7)
	        if (dataBhs == 'id') {
                ttsId.save('./media/tts/resId.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resId.mp3', id)
                })
            } else if (dataBhs == 'en') {
                ttsEn.save('./media/tts/resEn.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resEn.mp3', id)
                })
            } else if (dataBhs == 'jp') {
                ttsJp.save('./media/tts/resJp.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resJp.mp3', id)
                })
	    } else if (dataBhs == 'ar') {
                ttsAr.save('./media/tts/resAr.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resAr.mp3', id)
                })
            } else {
                client.reply(from, 'Masukkan data bahasa : [id] untuk indonesia, [en] untuk inggris, [jp] untuk jepang, dan [ar] untuk arab', id)
            }
            break
		case '!pantun':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
            .then(res => res.text())
            .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                client.reply(from, randompantun.replace(/aruga-line/g,"\n"), id)
            })
            .catch(() => {
                client.reply(from, 'Ada yang Error!', id)
            })
            break
		case '!katabijak':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
            .then(res => res.text())
            .then(body => {
                let splitbijak = body.split('\n')
                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                client.reply(from, randombijak, id)
            })
            .catch(() => {
                client.reply(from, 'Ada yang Error!', id)
            })
            break	
		case 'kapankah':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) client.reply(from, 'UPSS Format salah! Ketik *!help* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
            break	
        case 'rate':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            if (!rating) client.reply(from, 'UPSS Format salah! Ketik *!help* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
            break
        case 'apakah':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) client.reply(from, 'UPSS Format salah! Ketik *!help* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
            break
         case 'bisakah':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) client.reply(from, 'UPSS Format salah! Ketik *!help* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
            break
		case '!koin':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
              client.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
            } else {
              client.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
            }
            break
        case '!dadu':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const dice = Math.floor(Math.random() * 6) + 1
            await client.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
            break	
        case '!nulis':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!nulis [teks]*', id)
            const nulis = encodeURIComponent(body.slice(7))
            client.reply(from, mess.wait, id)
            let urlnulis = `https://vlaxrar.herokuapp.com/nulis?text=${nulis}&apiKey=${apiKey}`
            await fetch(urlnulis, {method: "GET"})
            .then(res => res.json())
            .then(async (json) => {
                await client.sendFileFromUrl(from, json.result, 'Nulis.jpg', 'Nih anjim', id)
            }).catch(e => client.reply(from, "Error: "+ e));
            break
        case '!ytmp3':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp3 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const resp = await get.get(`https://vlaxrar.herokuapp.com/api/yta?url=${args[1]}&apiKey=${apiKey}`).json()
                if (resp.error) {
                    client.reply(from, resp.error, id)
                } else {
                    const { title, thumb, filesize, result } = await resp
                    if (Number(filesize.split(' MB')[0]) >= 30.00) return client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                    client.sendFileFromUrl(from, thumb, 'thumb.jpg', `➸ *Title* : ${title}\n➸ *Filesize* : ${filesize}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await client.sendFileFromUrl(from, result, `${title}.mp3`, '', id).catch(() => client.reply(from, mess.error.Yt3, id))
                    //await client.sendAudio(from, result, id)
                }
            } catch (err) {
                client.sendText(ownerNumber[0], 'Error ytmp3 : '+ err)
                client.reply(from, mess.error.Yt3, id)
            }
            break
        case '!ytmp4':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp4 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
            let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLin) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const ytv = await get.get(`https://vlaxrar.herokuapp.com/api/ytv?url=${args[1]}&apiKey=${apiKey}`).json()
                if (ytv.error) {
                    client.reply(from, ytv.error, id)
                } else {
                    if (Number(ytv.filesize.split(' MB')[0]) > 40.00) return client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                    client.sendFileFromUrl(from, ytv.thumb, 'thumb.jpg', `➸ *Title* : ${ytv.title}\n➸ *Filesize* : ${ytv.filesize}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await client.sendFileFromUrl(from, ytv.result, `${ytv.title}.mp4`, '', id).catch(() => client.reply(from, mess.error.Yt4, id))
                }
            } catch (er) {
                client.sendText(ownerNumber[0], 'Error ytmp4 : '+ er)
                client.reply(from, mess.error.Yt4, id)
            }
            break
        case '!wiki':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!wiki [query]*\nContoh : *!wiki asu*', id)
            const query_ = body.slice(6)
            const wiki = await get.get(`https://vlaxrar.herokuapp.com/api/wiki?q=${query_}&lang=id&apiKey=${apiKey}`).json()
            if (wiki.error) {
                client.reply(from, wiki.error, id)
            } else {
                client.reply(from, `➸ *Query* : ${query_}\n\n➸ *Result* : ${wiki.result}`, id)
            }
            break
        case '!cuaca':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await get.get(`https://vlaxrar.herokuapp.com/api/cuaca?q=${tempat}&apiKey=${apiKey}`).json()
            if (weather.error) {
                client.reply(from, weather.error, id)
            } else {
                client.reply(from, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desk}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, id)
            }
            break
        case '!fb':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!fb [linkFb]* untuk contoh silahkan kirim perintah *!readme*', id)
            if (!args[1].includes('facebook.com')) return client.reply(from, mess.error.Iv, id)
            client.reply(from, mess.wait, id)
            const epbe = await get.get(`https://vlaxrar.herokuapp.com/api/epbe?url=${args[1]}&apiKey=${apiKey}`).json()
            if (epbe.error) return client.reply(from, epbe.error, id)
            client.sendFileFromUrl(from, epbe.result, 'epbe.mp4', epbe.title, id)
            break
		case '!shorturl':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!shorturl [linkWeb]*\nContoh : *!shorturl https://neonime.vip*', id)
            const sorturl = body.slice(10)
            const surl = await axios.get('https://vlaxrar.herokuapp.com/api/shorturl?url=' + sorturl)
            const surll = surl.data
            if (surll.error) return client.reply(from, ssww.error, id)
            const surl2 = `Link : ${sorturl}\nShort URL : ${surll.result}`
            client.sendText(from, surl2, id)
            break
		case '!spamcall':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner flin sky', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const spam = await slicedArgs.join(' ')
            console.log(spam)
            const call2 = await axios.get('https://tobz-api.herokuapp.com/api/spamcall?no=' + spam)
            const { logs } = call2.data
                await client.sendText(from, `Logs : ${logs}` + '.')
            break
		case '!google':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            client.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return client.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                client.reply(from, vars, id);
            }).catch(e => {
                console.log(e)
                client.sendText(ownerNumber, 'Google Error : ' + e);
            })
            break
		case '!ramalpasangan':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ramalpasangan [kamu|pasangan]*\nContoh : *!ramalpasangan Rey|Flin*', id)
            arg = body.trim().split('|')
            if (arg.length >= 2) {
            client.reply(from, mess.wait, id)
            const kamu = arg[0]
            const pacar = arg[1]
            const rpmn = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
            const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➸ Cinta : ${rpmn}\n➸ Jodoh : ${rpmn2}\n➸ Kemiripan : ${rpmn3}\n➸ Kesukaan : ${rpmn4}\n➸ Kesamaan : ${rpmn5}\n➸ Kebucinan ${rpmn6}`
            client.reply(from, rjh2, id)
            } else {
            await client.reply(from, 'Wrong Format!', id)
            }
            break	
		case '!katasenja':
		    const kastun = ["Hampa itu seperti langkah tak berjejak, senja tapi tak jingga, cinta tapi tak dianggap","Tangannya menjadi pengganti tanganku untuk menuntunmu' Pundaknya menjadi pengganti pundakku untukmu bersandar. Biarlah gemercik gerimis, carik senja, secangkir teh, dan bait lagu menjadi penggantimu.","Kenapa aku suka senja? Karena negeri ini kebanyakan pagi, kekurangan senja, kebanyakan gairah, kurang perenungan.","Senja tak pernah salah hanya kenangan yang membuatnya basah.","Di bawah alismu hujan berteduh. Di merah matamu senja berlabuh.","Aku ingin kamu saja yang menemaniku membuka pagi hingga melepas senja, menenangkan malam dan membagi cerita.","Senja terlalu buru-buru berlalu, padahal aku baru hendak mewarnai langit untukmu dengan warna-warna rinduku yang selalu biru.","Melukiskanmu saat senja. Memanggil namamu ke ujung dunia. Tiada yang lebih pilu. Tiada yang menjawabku. Selain hatiku dan ombak berderu.","Ada yang tak tenggelam ketika senja datang: Rasa.","Senja yang retak. Kapal-kapal berlayar membawa kenangan. Airmatamu menjelma puisi paling duri, paling angin.","Tuhan, bersama tenggelamnya matahari senja ini,redakanlah kekecewaan dan kemarahan di hati ini. Sabarkanlah aku. Aamiin.","Beberapa penyair sibuk bersembunyi di balik senja, hujan, gemintang, ufuk, gunung, pantai, jingga, lembayung, kopi, renjana, juga berbagai kata romantis lainnya, untuk kemudian lupa pada fakta bahwa dunia sedang tidak baik-baik saja. Hingga akhirnya kata-kata hanyalah hiasan semata.","Maka siluetkan tubuhmu berlatar senja, karena tak sanggup kulihat airmatamu, kekasih.","Semerbak rindu kuasai udara panas ini, senja pun ikut berdebar menanti berita mu tentang perang dan cinta.","Aku hanyalah kunang-kunang dan engkau hanyalah senja. Saat gelap kita berbagi. Saat gelap kita abadi.","Disetiap senja, aku ingin melukis langit dengan warna mata kita: warna merah kerinduan.","Jika pena berganti rupa menjadi daun senja, biarlah dia mengering, lalu tersapu angin, sendiri dan dibiarkan oleh sepi.","Kupetik pipinya yang ranum,kuminum dukanya yang belum: Kekasihku, senja dan sendu telah diawetkan dalam kristal matamu.","Terkadang senja mengingatkan pada rumah, pada orang-orang yang membuat hati kita rindu untuk pulang.","Jika kamu merindukan seseorang, tataplah matahari sore. Kirimkan pesan rindumu untuknya lewat senja.","Uang, berilah aku rumah yang murah saja,yang cukup nyaman buat berteduh senja-senjaku, yang jendelanya hijau menganga seperti jendela mataku.","Kita hanyalah setitik senja yang kadang indah lalu surut dengan bermuram durja, dunia bagi masa kecil kita hanyalah mainan fana yang terus membumbung, mengitari angkasa dan membuat kita terlena akan keindahannya…","Dulu, pada suatu ketika, senja pernah indah, seindah janji-janji yang berujung menjadi sumpah serapah.","Aku melintasi kehidupan dan kala. Aku berlayar menembus senja. Kuberanikan diri menulis untuk mengabadikan momen hidup dalam lembaran kertas.","Di tengah angin senja yang mendesak, aku merasakan kekuasaan waktu, yang tanpa pandang bulu mengubah segala-galanya.","Gelisah, menampar tak basah pada senja yang bergeromis. Begitu keringkah ladang pertautan kita hingga tunas harapan enggan tumbuh lagi.","Setiap hari ada senja, tapi tidak setiap senja adalah senja keemasan, dan setiap senja keemasan itu tidaklah selalu sama.","Biarlah kunikmati kepedihan ini. Karena sesungguhnya perasaan perih disebabkan cinta yang terkulai sebelum berbunga, adalah sama sendunya dengan memeram cina itu sendiri selama bertahun-tahun. Bagai senja yang tak kunjung malam.","Begini rasanya harihari di linimasa. Wajahmu; 140 huruf yang terus menguntitku tanpa jarak hingga senja lesap dalam kita.","Percintaan itu fajar perkawinan. Perkawinan itu senja percintaan.","Usia senja bukanlah hal yang membuat sedih. Itu bisa jadi hal yang disyukuri jika kita menyelesaikan semua perkejaan kita.","Hidup seperti ini. Aku bisa merasakan senja yang bercampur bau tanah basah sepeninggal hujan."]
			let katsen = kastun[Math.floor(Math.random() * kastun.length)]
			client.reply(from, katsen, 'senja')
			break
        case '!aesthetic':
           const aestetic = ["http://wa-botstiker.my.id/images/aesthetic/aachal-6geVJeZJMg8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/abyan-athif-BCx6t5pJwVw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-UUJzCuHUfYI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-kx1r9Fgqe7s-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-lXaOSpd_UQw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anders-jilden-AkUR27wtaxs-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/andrea-boschini-5Ipk8IgNpPg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anmol-gupta-6Zpojuvyr-E-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/austin-chan-ukzHlkoz1IE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/bantersnaps-1sUs8JbGx74-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/beasty--HxIhfS_dUk-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/daniel-tseng-W9kq9suABY4-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/estee-janssens-MUf7Ly04sOI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/fabian-moller-gI7zgb80QWY-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/florian-klauer-mk7D-4UCfmg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/ian-dooley-aaAllJ6bmac-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/karthikeya-gs-ZMM2sVJKd3A-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/kevin-laminto-hSeh-3ID830-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/larm-rmah-CB8tGaFoW38-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/matthew-ronder-seid-GWzCpqXPNDw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/orfeas-green-G5A5ZNjS2tE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/pari-karra-elK1z1WcsR8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-qEWEz-U5p8Q-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-z4gWzj0p93c-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/tamara-gore-ldZrvy2SOEA-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/vanessa-serpas-S4fYv5LQ4_A-unsplash.jpg"]
           let aes = aestetic[Math.floor(Math.random() * aestetic.length)]
           client.sendFileFromUrl(from, aes, 'aestetic.jpg', 'aesthetic')
           break
        case '!ptl2':
            const itemssh = ["https://i.pinimg.com/originals/74/b0/26/74b0268d2f4546996fa25afdafa980dc.jpg","https://i.pinimg.com/originals/f2/e9/1d/f2e91d2e9b671d6ebf59bacab216762f.jpg","https://i.pinimg.com/originals/80/72/79/807279a91face343ca53bffcec989cf4.jpg","https://i.pinimg.com/originals/a1/11/1a/a1111abf90379e4fa883fa3b8b5d643a.jpg","https://i.pinimg.com/originals/09/bd/57/09bd57e50174134865c250684e9ddda1.jpg","https://i.pinimg.com/originals/73/a2/3d/73a23de8b98399afd93eb723540bae80.jpg","https://i.pinimg.com/originals/72/ee/27/72ee2735bbdb1b1a4992efbf4094477e.png","https://i.pinimg.com/originals/cb/a2/89/cba28917d4f8d5b8de63ec89b66d1afe.jpg","https://i.pinimg.com/originals/98/02/64/9802648c9c057644f754434871fc4e2e.jpg","https://i.pinimg.com/originals/46/c2/7b/46c27b4b1d2ae4459f750afd0d8021b1.jpg","https://i.pinimg.com/originals/68/56/1e/68561ed7e1a97842030fb0f39edf9c80.jpg","https://i.pinimg.com/originals/73/3e/ed/733eed5f6d1b8a9f22e692b993e70491.jpg","https://i.pinimg.com/originals/f5/71/6a/f5716a30204f93707bd2c8fc91bc9462.jpg","https://i.pinimg.com/originals/16/52/1d/16521d9b7ea44aa0a28e360bb5f705d6.jpg","https://i.pinimg.com/originals/27/fe/e8/27fee89007af1025d601c87763f1dc1d.jpg","https://i.pinimg.com/originals/d8/12/4a/d8124a11bd20912b0402ff61130f8489.jpg","https://i.pinimg.com/originals/eb/44/81/eb4481101e8b8763428e8fbbad3a7bdb.jpg","https://i.pinimg.com/originals/a6/34/cf/a634cfa655269069439e9476780b46fe.jpg","https://i.pinimg.com/originals/b5/01/72/b50172848dd7e3465beb16adb0599684.jpg","https://i.pinimg.com/originals/54/42/36/54423601bc0c926de050fc2d0836be79.jpg","https://i.pinimg.com/originals/e2/3c/0c/e23c0c12244ad392c982d6267d262dd2.jpg","https://i.pinimg.com/originals/fa/10/ca/fa10ca99305c151b3ae8cad8a20794f2.jpg","https://i.pinimg.com/originals/b4/02/be/b402bed7c76e052f368dac1ec740210a.jpg","https://i.pinimg.com/originals/32/43/8f/32438f37c5b6a1b2dabbf934162b11e4.jpg","https://i.pinimg.com/originals/55/49/cc/5549ccb0b32a10216b09f67632070507.jpg","https://i.pinimg.com/originals/a3/aa/aa/a3aaaae3a00f4211af2e8e4ecb1da007.jpg","https://i.pinimg.com/originals/fa/5f/6d/fa5f6d5e40adc51c2095333d7501e76f.jpg","https://i.pinimg.com/originals/44/e4/f7/44e4f767400646e3bc5bc6e0ebf7368d.jpg","https://i.pinimg.com/originals/34/20/8e/34208e0a125963d781b9171cb54bc171.jpg","https://i.pinimg.com/originals/8d/a4/0b/8da40b8c05ed685a39c93b27e4d69046.jpg","https://i.pinimg.com/originals/81/eb/13/81eb13ba9c391c3bbb56f0667b717740.jpg","https://i.pinimg.com/originals/56/3f/89/563f896b53f0787abf9ccef902d5209c.jpg","https://i.pinimg.com/originals/4e/b0/01/4eb0010c0fbab4324989af5186e3aa4a.jpg","https://i.pinimg.com/originals/68/94/13/68941383215d751d5c6eb72af4549019.jpg","https://i.pinimg.com/originals/12/b4/ee/12b4eef886901649cca0799faa9f651f.jpg","https://i.pinimg.com/originals/01/4b/9e/014b9edaf6f3cf315793b0a63c24fa35.jpg","https://i.pinimg.com/originals/78/fa/10/78fa10ab94c0dc9e19a18358a9752070.jpg","https://i.pinimg.com/originals/53/4e/85/534e85a5af73e256d5dd824bef563de0.jpg","https://i.pinimg.com/originals/9f/37/7a/9f377a105a0f7cc4bea1f553bea36d06.jpg","https://i.pinimg.com/originals/a6/6c/6c/a66c6cde03ea6ad72ca36776c5bb2ed9.jpg","https://i.pinimg.com/originals/5e/16/97/5e16970e6a84f3a4959c8d7e7117d287.jpg","https://i.pinimg.com/originals/88/c0/72/88c072ea8f6b047c8971efa099f2ab25.jpg","https://i.pinimg.com/originals/03/5f/ed/035fed621d33d42f453f314049a09244.jpg","https://i.pinimg.com/originals/0d/53/15/0d53156e1fa4d591d32e2ecd8c10f953.jpg","https://i.pinimg.com/originals/d0/5e/b8/d05eb893d80d9a02aa03d4b1314adff5.jpg","https://i.pinimg.com/originals/7c/e5/d8/7ce5d88853231888e9798f65a24ad11a.jpg","https://i.pinimg.com/originals/7c/67/0f/7c670fde8e6428661073e0a01996406b.jpg","https://i.pinimg.com/originals/6a/74/e5/6a74e5c6c6aeca129e9f5fd6976c77cb.jpg","https://i.pinimg.com/originals/3b/89/9c/3b899c8c52604a10812ee06b8ef4ad84.jpg","https://i.pinimg.com/originals/6a/15/1e/6a151e72a8f017c8988eb570841c8b35.jpg"]
            let cewesh = itemssh[Math.floor(Math.random() *itemssh.length)]
            client.sendFileFromUrl(from, cewesh, 'ptlsh.jpeg', 'Piw', id)
            break
        case '!ptl3':
            const itemslh = ["https://i.pinimg.com/originals/69/d7/b3/69d7b3d5a089e7cbee0250ea5da9b14b.jpg","https://i.pinimg.com/originals/78/fa/10/78fa10ab94c0dc9e19a18358a9752070.jpg","https://i.pinimg.com/originals/93/e0/a3/93e0a3816183696ff89b1ad7db2fd3c0.jpg","https://i.pinimg.com/originals/a6/34/cf/a634cfa655269069439e9476780b46fe.jpg","https://i.pinimg.com/originals/dc/f5/69/dcf569a7b08efcae64d0747b51d04a7d.jpg","https://i.pinimg.com/originals/4f/96/2b/4f962b89bd7ceb438b3e9ebbd075184c.jpg","https://i.pinimg.com/originals/c2/fb/e7/c2fbe7a6955a85c51b9ee8062a7b68d3.jpg","https://i.pinimg.com/originals/44/54/24/44542415cf206f2c041e3bbb52a69419.jpg","https://i.pinimg.com/originals/ae/3c/40/ae3c40e0a2f653811b5a67ccd6b9d8cc.jpg","https://i.pinimg.com/originals/bd/fa/33/bdfa3317d96e6cdafaf27e3b337d05b4.jpg","https://i.pinimg.com/originals/75/6a/f2/756af236ae909431567ed184c43aae6f.png","https://i.pinimg.com/originals/a5/95/d7/a595d7fe6b8dc00d1aaa7287f1dd304e.jpg","https://i.pinimg.com/originals/40/37/78/40377871ee06a4a434c39e90b1f647e1.jpg","https://i.pinimg.com/originals/45/73/ac/4573ac9484c480500872b7c91f758040.jpg","https://i.pinimg.com/originals/32/7d/0b/327d0be89cc60321128d0f0bdaadfc15.jpg","https://i.pinimg.com/originals/f4/a1/0f/f4a10ffd44aea604383be84a34f69f90.jpg","https://i.pinimg.com/originals/ec/7f/b5/ec7fb5506136f72876633aab957a755a.jpg","https://i.pinimg.com/originals/4c/e9/15/4ce915c8245586f541c4d0a8b71cc500.jpg","https://i.pinimg.com/originals/03/2a/14/032a145e96154753e33bdda30d9f41f1.jpg","https://i.pinimg.com/originals/f4/5b/07/f45b070de82acec89092eaea1b415029.jpg","https://i.pinimg.com/originals/a9/f2/da/a9f2da1277fb7bc801856c3b9c12d37d.jpg","https://i.pinimg.com/originals/af/ab/93/afab93ebbf109a601dcb77b5baa494b4.jpg","https://i.pinimg.com/originals/b9/38/df/b938dfba6c139ad45ce51203a43eac0d.jpg","https://i.pinimg.com/originals/af/10/0a/af100a49cb8f53f0dd5b48664ede9db8.jpg","https://i.pinimg.com/originals/99/18/6c/99186c2145e1223f885103f51817be78.jpg","https://i.pinimg.com/originals/3c/fd/c9/3cfdc9ba7cf79ed061808e162162f4da.jpg","https://i.pinimg.com/originals/31/95/64/319564a33b5ed46a52d30c18d2310f22.jpg","https://i.pinimg.com/originals/1c/2d/9f/1c2d9ffdd104200355bab43c9d3fad20.gif","https://i.pinimg.com/originals/4a/aa/12/4aaa12940f51fdfb1684964df3796c4c.jpg","https://i.pinimg.com/originals/37/90/bc/3790bc29be16d95174af4eff4ee3859f.jpg","https://i.pinimg.com/originals/4c/12/8f/4c128fda6e71a9f4c670a78a21d8c196.jpg","https://i.pinimg.com/originals/34/92/10/3492100b4a924458a2bf5340d68293c2.jpg","https://i.pinimg.com/originals/5a/dd/12/5add12091eafba364ec76c91d20e75ac.jpg","https://i.pinimg.com/originals/da/c3/59/dac359d1fc87193c2b9d85bb96fedcbc.jpg","https://i.pinimg.com/originals/2e/d6/a9/2ed6a9670d942220eab92b99bb0d1c09.jpg","https://i.pinimg.com/originals/f1/89/e3/f189e3d9b353f91b60060cc64e6706c9.jpg","https://i.pinimg.com/originals/8c/06/c2/8c06c22283cf98abdb8922e2f3aa0a6a.jpg","https://i.pinimg.com/originals/8b/6f/0b/8b6f0b1e213240eaad90894292a2d3c1.jpg","https://i.pinimg.com/originals/89/bf/b8/89bfb86392d39477adcd66444cf19845.jpg","https://i.pinimg.com/originals/35/e2/cc/35e2cc3c535d8f1cfeaf13cce69ac984.jpg","https://i.pinimg.com/originals/c0/01/a1/c001a16e2629872a3d7ea7fdbe5a4e98.jpg","https://i.pinimg.com/originals/b4/eb/48/b4eb486def2d413716c5fa033af9fb34.jpg","https://i.pinimg.com/originals/55/ee/7b/55ee7b5f4889cc34ec1a01d2e7875b53.jpg","https://i.pinimg.com/originals/0c/b3/0e/0cb30ea660aafbae32cc07433bf3eea2.jpg","https://i.pinimg.com/originals/1f/50/23/1f5023991f2a01cff748e84c4cf3612d.jpg","https://i.pinimg.com/originals/ab/53/07/ab5307df9234934f385eb6235aa6c2cd.jpg","https://i.pinimg.com/originals/e1/a1/7c/e1a17c5f359846741c687ef1fcadb316.jpg","https://i.pinimg.com/originals/16/1b/21/161b215ee2f8e0a040c91f18c054d705.jpg","https://i.pinimg.com/originals/da/07/1a/da071a5fafbc6487d38edd4e9f3401db.jpg","https://i.pinimg.com/originals/54/f4/26/54f42615f9ad45743e6fb08ed86623f0.jpg"]
            let cewelh = itemslh[Math.floor(Math.random() *itemslh.length)]
            client.sendFileFromUrl(from, cewelh, 'ptlsh.jpeg', 'Wkwkwkw', id)
            break	
		case '!ptl':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa digunakan dalam group!', id)
            const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg", "https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg", "https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg", "https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg", "https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg", "https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg", "https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg", "https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg", "https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg", "https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg", "https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg", "https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg", "https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg", "https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg", "https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg", "https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg", "https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg", "https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg", "https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg", "https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg", "https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg", "https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg", "https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg", "https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg", "https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg", "https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg", "https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg", "https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg", "https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg", "https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg", "https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
            let pep = pptl[Math.floor(Math.random() * pptl.length)]
            client.sendFileFromUrl(from, pep, 'pptl.jpg', 'Follow ig : https://www.instagram.com/ptl_repost untuk mendapatkan penyegar timeline lebih banyak', message.id)
            break	
        case '!creator':
		case '!ownerbot':
		case '!owner':
            client.sendContact(from, '6281246460730@c.us')
			client.reply(from, 'itu kontak nya orang ganteng gan :v', id)
            break		
        case '!ig':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*')
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const resp = await get.get(`https://mhankbarbar.herokuapp.com/api/ig?url=${args[1]}&apiKey=${apiKey}`).json()
                if (resp.result.includes('.mp4')) {
                    var ext = '.mp4'
                } else {
                    var ext = '.jpg'
                }
                await client.sendFileFromUrl(from, resp.result, `igeh${ext}`, '', id)
            } catch {
                client.reply(from, mess.error.Ig, id)
                }
            break
		case '!groupinfo':
                    if (!isGroupMsg) return client.reply(from, '???!', message.id)
                    var totalMem = chat.groupMetadata.participants.length
                    var desc = chat.groupMetadata.desc
                    var groupname = formattedTitle
                    var welgrp = welkom.includes(chat.id)
                    var ngrp = nsfw_.includes(chat.id)
                    var grouppic = await client.getProfilePicFromServer(chat.id)
                    if (grouppic == undefined) {
                        var pfp = errorurl
                    } else {
                        var pfp = grouppic
                    }
                    await client.sendFileFromUrl(from, pfp, 'group.png', `➸ *Name : ${groupname}* 
*➸ Members : ${totalMem}*
*➸ Welcome : ${welgrp ? 'ON' : 'OFF'}*
*➸ NSFW : ${ngrp ? 'ON' : 'OFF'}*
*➸ Group Description* : ${desc}`)
            break
		case '!qrcode':
                    if (!isGroupMsg) return client.reply(from, `untuk mengunakan ketik ,!qrcode`, id)
                    if (!args.lenght >= 2) return
                    let qrcodes = body.slice(8)
                    await client.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process sukses!')
            break	
		case '!closegc':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa digunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya untuk Admin Grup!', id)
            client.setGroupToAdminsOnly(groupId, true)
		    client.sendText(from,'sukses close gc!', id)
            break
        case '!opengc':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa digunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya untuk Admin Grup!', id)
            client.setGroupToAdminsOnly(groupId, false)
		    client.sendText(from,'sukses open gc!', id)
            break
		case '!deskripsi':
            if (isGroupMsg) {
            if (isGroupAdmins) {
            try {
            const desk = body.slice(9)
                await client.setGroupDescription(from, `${desk}`, id)
            } catch {
                client.reply(from, 'Terjadi kesalahan, tidak dapat mengubah deskripsi grup', message)
                            }
            } else {
                clien.reply(from, 'Maaf, fitur ini hanya untuk owner grup', message)
                        }
            } else {
                client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
                    }
            break	
        case '!nsfw':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSWF Command berhasil di aktifkan di group ini! kirim perintah *!nsfwMenu* untuk mengetahui menu', id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSFW Command berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
		case '!risetlinkgroup':
            if (!isGroupMsg) return client.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return client.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return client.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isGroupMsg) {
            await client.revokeGroupInviteLink(groupId);
            client.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
            }
            break	
        case '!welcome':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break	
        case '!nsfwmenu':
            if (!isNsfw) return
            client.reply(from, '1. !randomHentai\n2. !randomNsfwNeko', id)
            break
		case '!sider':
            if (!isGroupMsg) return client.reply(from, 'Hanya untuk di dalam group')
            if (!quotedMsg) return client.reply(from, 'Tolong reply pesan')
            if (!quotedMsgObj) return client.reply(from, 'tolong reply pesan')
            try {
                const reader = await client.getMessageReaders(quotedMsgObj.id)
                let lista = ''
                for (let pembaca of reader) {
                    lista += `- @${pembaca.id.replace(/@c.us/g,'')}\n`
                }
                client.sendTextWithMentions(from, `hmm read doang..\n${lista}`)
            } catch (err) {
                console.log(err)
				client.reply(from, 'Maaf, Belum ada yang membaca pesan')
            }
            break	
		case '!setgcname':
            if (!isGroupMsg) return client.reply(from, `??`, id)
            if (!isGroupAdmins) return client.reply(from, `bukan admin jangan sok keras :v`, id)
            if (!isBotGroupAdmins) return client.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(14)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await client.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            client.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
		case '!setname':
            if (!isOwner) return client.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Flin Sky!`, id)
            const setnem = body.slice(9)
            await client.setMyName(setnem)
            client.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us','')} :)`, id)
            break
		case '!cgc':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya bisa digunakan oleh Owner', id)
            arg = body.trim().split(' ')
            const gcname = arg[1]
            client.createGroup(gcname, mentionedJidList)
            client.sendText(from, 'Berhasil membuat group!')
            break	
		case '!setpp':
            if(!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner!', id)
            const isqwtimg1 = quotedMsg && quotedMsg.type === 'image'
			if (isMedia && type == 'image' || isqwtimg1) {
				const dataMedia = isqwtimg1 ? quotedMsg : message
				const _mimetypee = dataMedia.mimetype
				const mediaData = await decryptMedia(dataMedia, uaOverride)
				const imageBase64 = `data:${_mimetypee};base64,${mediaData.toString('base64')}`
                await client.setProfilePic(imageBase64)
                await client.reply(from, 'Berhasil mengubah foto profile!', id)
            }
            break	
		case '!seticon':
			if (!isGroupMsg) return client.reply(from, '???!', id)
            if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan Flin Sky sebagai admin grup!', id)
            const isqwtimg = quotedMsg && quotedMsg.type === 'image'
			if (isMedia && type == 'image' || isqwtimg) {
				const dataMedia = isqwtimg ? quotedMsg : message
				const _mimetype = dataMedia.mimetype
				const mediaData = await decryptMedia(dataMedia, uaOverride)
				const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
				await client.setGroupIcon(groupId, imageBase64)
			} else if (args.length === 1) {
				if (!isUrl(url)) { await client.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
				client.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
				? client.reply(from, 'Maaf, link yang kamu kirim tidak memuat gambar.', id)
				: client.reply(from, 'Berhasil mengubah profile group', id))
			} else {
				client.reply(from, `Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption !seticon\n\n2. Silahkan ketik !seticon linkImage`)
			}
            break	
        case '!igstalk':
            if (args.length === 1)  return client.reply(from, 'Kirim perintah *!igStalk @username*\nConntoh *!igStalk @duar_amjay*', id)
            const stalk = await get.get(`https://vlaxrar.herokuapp.com/api/stalk?username=${args[1]}&apiKey=${apiKey}`).json()
            if (stalk.error) return client.reply(from, stalk.error, id)
            const { Biodata, Jumlah_Followers, Jumlah_Following, Jumlah_Post, Name, Username, Profile_pic } = stalk
            const caps = `➸ *Nama* : ${Name}\n➸ *Username* : ${Username}\n➸ *Jumlah Followers* : ${Jumlah_Followers}\n➸ *Jumlah Following* : ${Jumlah_Following}\n➸ *Jumlah Postingan* : ${Jumlah_Post}\n➸ *Biodata* : ${Biodata}`
            await client.sendFileFromUrl(from, Profile_pic, 'Profile.jpg', caps, id)
            break
        case '!infogempa':
            const bmkg = await get.get(`https://vlaxrar.herokuapp.com/api/infogempa?apiKey=${apiKey}`).json()
            const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg
            const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
            client.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            break
        case '!anime':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!anime [query]*\nContoh : *!anime darling in the franxx*', id)
            const animek = await get.get(`https://vlaxrar.herokuapp.com/api/kuso?q=${body.slice(7)}&apiKey=${apiKey}`).json()
            if (animek.error) return client.reply(from, animek.error, id)
            const res_animek = `Title: *${animek.title}*\n\n${animek.info}\n\nSinopsis: ${animek.sinopsis}\n\nLink Download:\n${animek.link_dl}`
            client.sendFileFromUrl(from, animek.thumb, 'kusonime.jpg', res_animek, id)
            break
        case '!nh':
            //if (isGroupMsg) return client.reply(from, 'Sorry this command for private chat only!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                client.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        //exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                        client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id)
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, then(() => `${title}.pdf`, '', id)).catch(() => 
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            /*if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)*/
                            //})
                    } catch (err) {
                        client.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    client.reply(from, '[❗] Kode nuClear Salah!')
                }
            } else {
                client.reply(from, '[ WRONG ] Kirim perintah *!nh [nuClear]* untuk contoh kirim perintah *!readme*')
            }
        	break
        case '!brainly':
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return client.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                client.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                client.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break
        case '!wait':
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                client.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                	if (resolt.docs && resolt.docs.length <= 0) {
                		client.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                	}
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *Ecchi* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    client.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                        client.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    client.reply(from, 'Error !', id)
                })
            } else {
                client.sendFile(from, './media/img/tutor.jpg', 'Tutor.jpg', 'Neh contoh mhank!', id)
            }
            break
        case '!quotemaker':
            arg = body.trim().split('|')
            if (arg.length >= 4) {
                client.reply(from, mess.wait, id)
                const quotes = encodeURIComponent(arg[1])
                const author = encodeURIComponent(arg[2])
                const theme = encodeURIComponent(arg[3])
                await quotemaker(quotes, author, theme).then(amsu => {
                    client.sendFile(from, amsu, 'quotesmaker.jpg','bayar 5juta...').catch(() => {
                       client.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                client.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
            }
            break
        case '!linkgroup':
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (isGroupMsg) {
                const inviteLink = await client.getGroupInviteLink(groupId);
                client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
            } else {
            	client.reply(from, '???!', id)
            }
            break
		case '!pokemon':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            q7 = Math.floor(Math.random() * 890) + 1;
            client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            break
        case '!wame':
            if (!isGroupMsg)return client.reply(from, `*Neh tod Link Nomor Wa Lu ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*Atau*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*`)
            break	
        case '!bc':
            if (!isOwner) return client.reply(from, `Perintah ini hanya untuk Owner Flin Sky`, id)
                bctxt = body.slice(4)
                txtbc = `*「 SXR BOT 」*\n\n${bctxt}`
                const semuagrup = await client.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await client.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) client.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    client.reply('Broadcast sukses!')
                }else{
                    for(let grupnya of semuagrup){
                        var cekgrup = await client.getChatById(grupnya)
                        if(!cekgrup.isReadOnly && isMuted(grupnya)) client.sendText(grupnya, txtbc)
                    }
                            client.reply('Broadcast Success!')
                }
                break
        case '!adminlist':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await client.sendTextWithMentions(from, mimin)
            break
        case '!ownergroup':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await client.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case '!mentionall':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await client.getGroupMembers(groupId)
            let hehe = '╔══✪〘 Mention All 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╠➥'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 SXR BOT 〙'
            await client.sendTextWithMentions(from, hehe)
            break
        case '!kickall':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await client.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            client.reply(from, 'Succes kick all member', id)
            break
        case '!leaveall':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChats = await client.getAllChatIds()
            const allGroups = await client.getAllGroups()
            for (let gclist of allGroups) {
                await client.sendText(gclist.contact.id, `ijin out di suuh owner ganteng , total chat aktif : ${allChats.length}`)
                await client.leaveGroup(gclist.contact.id)
            }
            client.reply(from, 'Succes leave all group!', id)
            break
        case '!clearall':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatz = await client.getAllChats()
            for (let dchat of allChatz) {
                await client.deleteChat(dchat.id)
            }
            client.reply(from, 'Succes clear all chat!', id)
            break
        case '!add':
            const orang = args[1]
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await client.addParticipant(from,`${orang}@c.us`)
            } catch {
                client.reply(from, mess.error.Ad, id)
            }
            break
        case '!kick':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await client.sendText(from, `bay ajg :v:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case '!leave':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await client.sendText(from,'bay awas invite gw lagi).then(() => client.leaveGroup(groupId))
            break
        case '!promote':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `menambahkan @${mentionedJidList[0]} selamat admin baru Jan sok  keras ok.`)
            break
        case '!demote':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `menghapus jabatan @${mentionedJidList[0]} soryy.`)
            break
        case '!join':
            //return client.reply(from, 'Jika ingin meng-invite bot ke group anda, silahkan izin ke wa.me/6285892766102', id)
            if (args.length < 2) return client.reply(from, 'Kirim perintah *!join linkgroup*\n\nEx:\n!join https://chat.whatsapp.com/', id)
            const link = args[1]
            const key = args[2]
            const tGr = await client.getAllGroups()
            const minMem = 256
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            if (key !== 'vxlar012021') return client.reply(from, '*kunci* invite bot? Donasi min 5k minat hubungi owner', id)
            const check = await client.inviteInfo(link)
            if (!isLink) return client.reply(from, 'yg bener bor link nya 🤬', id)
            if (tGr.length > 5) return client.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            if (check.size < minMem) return client.reply(from, 'Member group tidak melebihi 255, bot tidak akan masuk', id)
            if (check.status === 200) {
                await client.joinGroupViaLink(link).then(() => client.reply(from, 'Done!'))
            } else {
                client.reply(from, 'Link group tidak valid!', id)
            }
            break
        case '!delete':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return client.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, '🐀򡀀!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
		case '!setprefix':
            if (!isOwner) return client.reply(from, 'Maaf, Fitur ini hanya untuk OWNER FLIN SKY', id)
            if (args.length === 1) return client.reply(from, `*Kirim Perintah !setprefix #`, id)
            const pf = body.slice(11)
            setting.prefix = `${pf}`
            prefix = `${pf}`
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
            client.reply(from, `Change Prefix To ${pf} SUCCESS!`, id)
            break		
        case '!getses':
		    if (!isOwner) return client.reply(from, 'upss anda kepo', id)
            const sesPic = await client.getSnapshot()
            client.sendFile(from, sesPic, 'session.png','nih bos!!', id)
            break
        case '!lirik':
            if (args.length == 1) return client.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            client.reply(from, lirik, id)
            break
        case '!chord':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            const chord = await get.get(`https://vlaxrar.herokuapp.com/api/chord?q=${query__}&apiKey=${apiKey}`).json()
            if (chord.error) return client.reply(from, chord.error, id)
            client.reply(from, chord.result, id)
            break
        case '!listdaerah':
            const listDaerah = await get('https://mhankbarbar.herokuapp.com/daerah').json()
            client.reply(from, listDaerah.result, id)
            break
        case '!listblock':
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ @${i.replace(/@c.us/g,'')}\n`
            }
            client.sendTextWithMentions(from, hih, id)
            break
        case '!jadwalshalat':
            if (args.length === 1) return client.reply(from, '[❗] Kirim perintah *!jadwalShalat [daerah]*\ncontoh : *!jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *!listDaerah*')
            const daerah = body.slice(14)
            const jadwalShalat = await get.get('https://vlaxrar.herokuapp.com/api/jadwalshalat?daerah=${daerah}&apiKey=${apiKey}`).json()
            if (jadwalShalat.error) return client.reply(from, jadwalShalat.error, id)
            const { Imsyak, Subuh, Dhuha, Dzuhur, Ashar, Maghrib, Isya } = await jadwalShalat
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `Jadwal shalat di ${daerah}, ${tgl}-${arrbulan[bln]}-${thn}\n\nImsyak : ${Imsyak}\nSubuh : ${Subuh}\nDhuha : ${Dhuha}\nDzuhur : ${Dzuhur}\nAshar : ${Ashar}\nMaghrib : ${Maghrib}\nIsya : ${Isya}`
            client.reply(from, resultJadwal, id)
            break
        case '!listchannel':
            client.reply(from, listChannel, id)
            break
        case '!jadwaltv':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!jadwalTv [channel]*', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            client.reply(from, jadwal, id)
            break
        case '!jadwaltvnow':
            const jadwalNow = await get.get('https://api.haipbis.xyz/jadwaltvnow').json()
            client.reply(from, `Jam : ${jadwalNow.jam}\n\nJadwalTV : ${jadwalNow.jadwalTV}`, id)
            break
        case '!loli':
            const loli = await get.get('https://vlaxrar.herokuapp.com/api/randomloli').json()
            client.sendFileFromUrl(from, loli.result, 'loli.jpeg', '*L O L I*', id)
            break
        case '!waifu':
            const waifu = await get.get(`https://mhankbarbar.herokuapp.com/api/waifu?apiKey=${apiKey}`).json()
            client.sendFileFromUrl(from, waifu.image, 'Waifu.jpg', `➸ Name : ${waifu.name}\n➸ Description : ${waifu.desc}\n\n➸ Source : ${waifu.source}`, id)
            break
        case '!husbu':
            const diti = fs.readFileSync('./lib/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            client.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            break
        case '!randomhentai':
            if (isGroupMsg) {
                if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
                break
            } else {
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
            }
        case '!randomnsfwneko':
            if (isGroupMsg) {
                if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            } else {
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            }
            break
        case '!randomnekonime':
            const nekonime = await get.get('https://vlaxrar.herokuapp.com/api/nekonime').json()
            if (nekonime.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, nekonime.result, `Nekonime${ext}`, 'Nekonime!', id)
            break
        case '!randomtrapnime':
            const trap = await randomNimek('trap')
            if (trap.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, trap, `trapnime${ext}`, 'Trapnime!', id)
            break
        case '!randomanime':
            const nime = await randomNimek('anime')
            if (nime.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, nime, `Randomanime${ext}`, 'Randomanime!', id)
            break
        case '!inu':
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            break
        case '!neko':
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case '!sendto':
            client.sendFile(from, './msgHndlr.js', 'msgHndlr.js')
            break
        case '!url2img':
            const _query = body.slice(9)
            if (!_query.match(isUrl)) return client.reply(from, mess.error.Iv, id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!url2img [web]*\nContoh *!url2img https://google.com*', id)
            const url2img = await get.get(`https://mhankbarbar.herokuapp.com/api/url2image?url=${_query}&apiKey=${apiKey}`).json()
            if (url2img.error) return client.reply(from, url2img.error, id)
            client.sendFileFromUrl(from, url2img.result, 'kyaa.jpg', null, id)
            break
        case '!quote':
        case '!quotes':
            const quotes = await get.get('https://vlaxrar.herokuapp.com/api/randomquotes').json()
            client.reply(from, `➸ *Quotes* : ${quotes.quotes}\n➸ *Author* : ${quotes.author}`, id)
            break
        case '!quotesnime':
            const skya = await get.get('https://vlaxrar.herokuapp.com/api/quotesnime/random').json()
            skya_ = skya.data
            client.reply(from, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
            break
        case '!meme':
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            break
        case '!help':
            client.sendText(from, help)
            break
        case '!readme':
            client.reply(from, readme, id)
            break
        case '!info':
            client.sendLinkWithAutoPreview(from, 'https://github.com/FlinSkyReal/rar-rey-whatsapp', info)
            break
        case '!snk':
            client.reply(from, snk, id)
            break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //client.kill().then(a => console.log(a))
    }
}
