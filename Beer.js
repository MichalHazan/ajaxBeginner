const AllBeers = document.querySelector(".AllBeers")

// ---פונקציה שמכינה כרטיסיות בירה---
async function BeersCard(BeersArr) {
    AllBeers.innerHTML = ""
    BeersArr.forEach(element => {

        const BeerDiv = document.createElement("div")
        BeerDiv.className = "BeerDiv"
        const BeerImg = document.createElement("img")
        BeerImg.src = element.image_url
        const BeerName = document.createElement("h1")
        BeerName.textContent = element.name
        const BeerAbv = document.createElement("h2")
        BeerAbv.textContent = element.abv + "%"
        const BeerHops = document.createElement("h3")
        let Beerhop = []
        element.ingredients.hops.forEach(hop => {
            Beerhop.push(hop.name)
        });
        let res = Beerhop.reduce((total, item) => {
            total[item] = (total[item] || 0) + 1;
            return total;
        }, {});
        // console.log(res);
        // console.log(element.name + "-hops:" + Beerhop); 

        BeerHops.textContent = "hops:" + JSON.stringify(res)

        BeerDiv.appendChild(BeerImg)
        BeerDiv.appendChild(BeerName)
        BeerDiv.appendChild(BeerAbv)
        BeerDiv.appendChild(BeerHops)

        AllBeers.appendChild(BeerDiv)
    });

}

//----פונקציה שלוקחת את הבירות מאתר אחר----
(getBeersFromAPI = async () => {
    try {
        const Beers = await fetch(`https://api.punkapi.com/v2/beers`)
        const BeersArr = await Beers.json()

        // console.log(JSON.stringify(BeersArr[1].ingredients.hops[0].name));


        BeersCard(BeersArr)

    } catch (err) { console.log(err); }
})();


//---פונקציה שמעבירה בין עמודים של הבירות---
//--קודם ניצור רשימת עמודים---
let pageNum = 1;
const UlPages = document.querySelector("ul")
UlPages.className = "nav nav-tabs"
for (let i = 0; i < 5; i++) {
    const pageLi = document.createElement("li")
    pageLi.className = "nav-item"
    let aName = document.createElement("a")
    aName.id = "page-" + pageNum
    aName.textContent = "page " + pageNum
    pageNum++
    aName.className = "nav-link"
    aName.href = '#'

    aName.addEventListener('click', () => {
        pageNum = aName.id.split("-").pop()
        console.log(aName.id);
        console.log(pageNum);
        GetBeersPage(pageNum)

    })

    pageLi.appendChild(aName)
    UlPages.appendChild(pageLi)


}
//---takes the currect API from the number page
async function GetBeersPage(pageNum) {
    try {
        const BeersByPage = await fetch(`https://api.punkapi.com/v2/beers?page=${pageNum}`)
        const BeersArrByPage = await BeersByPage.json()
        BeersCard(BeersArrByPage)

    } catch (err) { console.log(err); }

}
