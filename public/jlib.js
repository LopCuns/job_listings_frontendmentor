export { j,els }

const j = {
    $ : (id) => document.getElementById(id),
    el : (tag) => document.createElement(tag),
    addClass : (el,className,rtr) =>{
        el.classList.add(className)
        if(rtr) return el
    },
    txtContent : (el,txt,rtr) =>{
        el.textContent = txt
        if(rtr) return el
    },
    ev : (el,evType,fn) => el.addEventListener(evType,fn),
    query : (el,query) => el.querySelector(query),
    allQuery : (el,query) => el.querySelectorAll(query),
    setAttr : (el,attr,val) => el.setAttribute(attr,val)
}

const els = {
    businessCard :()=> j.query(j.$('businessCard').content.cloneNode(true),'.business'),
    filter: (filter) => j.txtContent(j.addClass(j.el('p'),'business__filters__filter',true),filter,true),
    new: () => j.txtContent(j.addClass(j.el('p'),'business__text__new',true),'new',true),
    featured : () => j.txtContent(j.addClass(j.el('p'),'business__text__featured',true),'featured',true)
}