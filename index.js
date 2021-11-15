const jokeElement = document.querySelector("h1") // הכותרת אשר מכילה את הבדיחה
const btnElement = document.querySelector("button") //כפתור הרענון לבדיחה ללא רענון דף   ajax
const SelectCatagory = document.querySelector("#catagory") //תיבת בחירת קטגוריה

// הפעולה ששמה בדיחה בכותרת אחרי כל רענון
const getNewJokeFromApi = async () => { //פעולה אסינכרונית
    try {
        const res = await fetch('https://api.chucknorris.io/jokes/random') //מתחברת למידע מהכתובת שנתנו
        console.log(res);
        const data = await res.json() //פונקצית ג'ייסון תמיר את התשובה לאובייקט אמיתי
        jokeElement.textContent = data.value //הבדיחה עצמה לפי מה שהשגנו מהאוייבקט
        // בחירת קטגוריה
        const catagory = await fetch('https://api.chucknorris.io/jokes/categories') //משתנה המכיל את הקטגוריות מהאתר
        const ChooseCatagory = await catagory.json() //נמיר את הקטגוריות מן האתר למערך שניתן להשתמש בו

        //-----לולאה שעוברת על כל המערך ושמה כל איבר במערך בתור אופציה בתיבת הבחירה----
        ChooseCatagory.forEach(cata => {
            const option = document.createElement("option") //יצירת אופציה לבחירה
            option.value = cata
            option.textContent = cata
            SelectCatagory.appendChild(option) //אימוץ הבחירה לתיבה

        });
    } catch (err) {
        console.log(err);
    }
}


getNewJokeFromApi() // כל פעם שנפתח את הדף תופיע בדיחה באקראי
btnElement.addEventListener('click', getJokesByCatagory) //לחיצה על כפתור רענון לכותרת מבלי לרענן את כל הדף
SelectCatagory.addEventListener('change', getJokesByCatagory) //מציג בדיחה לפי הקטגוריה שנבחרה

// --הפעולה המציגה את הבדיחה לפי הקטגוריה---
async function getJokesByCatagory() {
    console.log(SelectCatagory.value);
    if (SelectCatagory.value == "all") {
        getNewJokeFromApi()
    } else {

        const newjoke = await fetch(`https://api.chucknorris.io/jokes/random?category=${SelectCatagory.value}`) //שימוש בדולר מתנה יכולת שימוש במשתנה בתוך הכתובת
        console.log(newjoke);
        const data = await newjoke.json() //פונקצית ג'ייסון תמיר את התשובה לאובייקט אמיתי
        jokeElement.textContent = data.value
    }
}
