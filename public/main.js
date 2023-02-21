import { j,els } from "./jlib.js"


j.ev(window,'DOMContentLoaded',async ()=>{
    try{
        async function createCards(){
        const toFetch = await fetch('../data.json'),
        json = await toFetch.json()

        if(!toFetch.ok) throw {
        status : toFetch.status,
        statusText : toFetch.statusText
        }

        const main = j.$('main'),
        fragment = document.createDocumentFragment()

        Array.from(json).forEach(application=>{
            const card = els.businessCard()
            j.query(card,'.business__logo').src = `assets/${application.logo}`
            j.txtContent(j.query(card,'.business__text__name'),application.company)
            j.txtContent(j.query(card,'.business__text__position'),application.position)
            j.txtContent(j.query(card,'.business__text__more__contract'),application.contract)
            j.txtContent(j.query(card,'.business__text__more__when'),application.postedAt)
            j.txtContent(j.query(card,'.business__text__more__where'),application.location)
            if(application.new) j.query(card,'.business__text__top').append(els.new())
            if(application.featured) j.query(card,'.business__text__top').append(els.featured())
            const filters = [application.role,application.level,...application.languages,...application.tools]
            filters.forEach(filter=> j.query(card,'.business__filters').append(els.filter(filter)))
            j.setAttr(card,'data-filters',filters.join(' '))
            fragment.append(card)
        })

        main.append(fragment)

        }
        createCards()
    }
    catch(err){
        if(err.status) console.warn(`an error has ocurred ${err.status} : ${err.statusText}`)
        else console.warn(err)
    }
})

