import {create,all, random} from 'mathjs';
import {Builder,By,Key, promise} from "selenium-webdriver";
import Mistyped from 'mistyped';

const math = create(all);
const options = 
{
    startAfter: 0,
    dimension: 2,
    includeMisplaced: true,
}
let typingAccuracy = .75;
let sentence = "what are online cookies?";
let typingSpeed=[.2,.4];
let pageDelay=[5,20];


async function search(typingAccuracy,sentence,typingSpeed,pageDelay){
    try
    {
        let driver = await new Builder().forBrowser("MicrosoftEdge").build();
        driver.get("https://www.google.com");

        let sentenceSplit = sentence.split(" ");
        isCorrect = [sentenceSplit.length*true];

        for (let wordSelection = 0; wordSelection<sentenceSplit.length;wordSelection++)
        {
            let typedWord;
            let mistypedInstance = Mistyped(sentenceSplit[wordSelection],options);
            if(wordSelection<sentenceSplit.length-1)
            {typedWord = chosenWord(mistypedInstance,sentenceSplit[wordSelection],typingAccuracy)+' ';}
            else
            {typedWord = chosenWord(mistypedInstance,sentenceSplit[wordSelection],typingAccuracy);}
        
            for(let charSelection =0; charSelection<typedWord.length;charSelection++)
            {
                try
                    {await driver.findElement(By.name("q")).sendKeys(typedWord.charAt(charSelection));}
                catch(e)
                    {console.error("Error during typing: ", e.message);}
            await sleep(typingSpeed[0],typingSpeed[1]);
            }
        }
        await driver.findElement(By.name("q")).sendKeys(Key.ENTER);
        await sleep(pageDelay[0],pageDelay[1]);
    } 
    catch(e)
        {console.error("Driver Iniziatization Failed",e.message);}
    finally 
        {if (driver) await driver.quit();}
}

async function sleep(min,max) {
        let pause = math.random();
        if (pause>.01)
        {
            let delay = (min+(max-min)*pause)*1000;
            return new Promise(resolve=>(setTimeout(resolve,delay)));
        }
        else
        {
            let distraction_min=3;
            let distraction_max=7;
            let disrtaction_delay = (distraction_min+(distraction_max-distraction_min)*pause)*1000;
            return new Promise(resolve=>(setTimeout(resolve,disrtaction_delay)));
        }
}

//Randomly gets a number between 0 and 99, then if number is available will use the incorrect choice or the correct choice if none is. 
function chosenWord(incorrectChoices,originalWord,chanceOfSuccess){
    let randomError = math.random();

    if(randomError>chanceOfSuccess)//determines if an error occured
        {   
            let randomNumber = randomNumberPortions(incorrectChoices.length);
            return incorrectChoices[randomNumber];
        }
    else
        {return originalWord;}
}

function randomNumberPortions(total)
    {return total === 0?0:math.floor(math.random()*total);}


search(typingAccuracy,sentence,typingSpeed,pageDelay);