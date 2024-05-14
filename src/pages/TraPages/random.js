const randomEat = () =>{
    let options = ["wzj","jgyt",'scw']
    let random = Math.floor(Math.random()*3)
    console.log(`今天吃${options[random]}`)
}

randomEat()