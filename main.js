import {create,all} from 'mathjs';
import {Builder,By,Key} from "selenium-webdriver";
import Mistyped from 'mistyped';

const math = create(all);
const options = 
{
    startAfter: 0,
    dimension: 0,

}

async function search(){
    let driver = await new Builder().forBrowser("MicrosoftEdge").build();
    await driver.get("https://www.google.com");

    let sentence = "what are online cookies?";
    let sentenceSplit = sentence.split(" ");
    console.log(sentenceSplit);
    

    for (let wordSelection = 0; wordSelection<sentenceSplit.length;wordSelection++)
    {
        
        
        let mistypedInstance = Mistyped(sentenceSplit[wordSelection]);//right now I will have mistyped word 0 "what" with mistake 0 "wgat",same with each following word
        
        if(wordSelection<sentenceSplit.length)
            mistypedInstance[wordSelection] = mistypedInstance[wordSelection]+' ';
        
        for(let charSelection =0; charSelection<mistypedInstance.length;charSelection++)
        {
            try{
                await driver.findElement(By.name("q")).sendKeys(mistypedInstance[wordSelection].charAt(charSelection));
            }
            catch(e){
                console.log(e instanceof TypeError);
                console.log(mistypedInstance[wordSelection].charAt(charSelection));
            }
            await sleep(.2,.4);//.4,.8
        }
    }
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER);

    

}

async function sleep(min,max) {
        let pause = math.random();
        if (pause>.00001)
        {
            let delay = (min+(max-min)*pause)*1000;
            return new Promise(resolve=>(setTimeout(resolve,delay)));
        }
        else
        {
            let distraction_min=1;
            let distraction_max=4;
            let disrtaction_delay = (distraction_min+(distraction_max-distraction_min)*pause)*1000;
            return new Promise(resolve=>(setTimeout(resolve,disrtaction_delay)));
        }
}
async function checkPoints()
{
    await driver.get("https://rewards.bing.com/");
}

search();