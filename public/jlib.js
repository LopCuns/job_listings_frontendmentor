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
    setAttr : (el,attr,val,rtr) => {
        el.setAttribute(attr,val)
        if(rtr) return el
    },
    append : (parent,node,rtr) =>{
        parent.append(node)
        if(rtr) return parent
    },
    appliedFilters : () => sessionStorage.getItem('appliedFilters'),
    businessElements : () => Array.from(j.allQuery(j.$('main'),'[data-filters]'))
}

const els = {
    businessCard :()=> j.query(j.$('businessCard').content.cloneNode(true),'.business'),
    filter: (filter) => j.txtContent(j.addClass(j.el('p'),'business__filters__filter',true),filter,true),
    new: () => j.txtContent(j.addClass(j.el('p'),'business__text__new',true),'new',true),
    featured : () => j.txtContent(j.addClass(j.el('p'),'business__text__featured',true),'featured',true),
    filterBar : (filter) => j.append(
        j.append(
            j.setAttr(j.addClass(j.el('div'),'filterBar__filters__filter',true),'data-filter',filter,true),
            j.txtContent(j.addClass(j.el('p'),'filterBar__filters__filter__name',true),filter,true),
            true),
            j.txtContent(j.addClass(j.el('button'),'filterBar__filters__filter__button',true),'x',true),
            true
    ),
    addFilter : (filter) =>{
        j.$('filterBox').classList.remove('hidden')
        const appliedFilters = j.appliedFilters()?j.appliedFilters().split(','):[]
        appliedFilters.push(filter)
        sessionStorage.setItem('appliedFilters',appliedFilters)
        return els.filterBar(filter)
    },
    removeFilter : (filter) =>{
        const appliedFilters = j.appliedFilters().split(',').filter(fl=>fl!==filter)
        sessionStorage.setItem('appliedFilters',appliedFilters)
        if(j.appliedFilters().replaceAll(',','') === '') j.$('filterBox').classList.add('hidden')
    },
    filterBusinesses : () =>{
        const allBusinesses = j.businessElements(),
        filters = j.appliedFilters().split(','),
        regularExpression = new RegExp(filters.reduce((ac,cc)=>ac+=`(?=.*${cc})`,''))

        allBusinesses.forEach(business=>{
            if(regularExpression.test(business.dataset.filters)) business.classList.remove('hiddenBusiness')
            else business.classList.add('hiddenBusiness')
        })
    },
    
}