import {create,all, random, e} from 'mathjs';
import {Builder,By,Key, promise} from "selenium-webdriver";
import Mistyped from 'mistyped';

const math = create(all);
const options = 
{
    startAfter: 0,
    dimension: 2,
    includeMisplaced: true,
}
let typingAccuracy = .95;
let sentence = "";
let typingSpeed=[.3,.4];
let pageDelay=[10,20];
let log ="";


async function search(typingAccuracy,sentence,typingSpeed,pageDelay){
    let driver;
    try
    {
        driver = await new Builder().forBrowser("MicrosoftEdge").build();
        await driver.get("https://www.duckduckgo.com");
        let sentenceSplit = sentence.split(" ");
        for (let wordSelection = 0; wordSelection<sentenceSplit.length;wordSelection++)
        {
            let actualWord = sentenceSplit[wordSelection];
            for(let charSelection =0; charSelection<actualWord.length;charSelection++)
            {
                let mistypedChar = Mistyped(sentenceSplit[wordSelection].charAt(charSelection),options);// gives a list of possible incorrect chars that can be chosen.
                
                let typedChar = chosenChar(mistypedChar,actualWord.charAt(charSelection),typingAccuracy);// determines wheter char is right or wrong.
                try
                    {await driver.findElement(By.name("q")).sendKeys(typedChar);log+=typedChar;}
                catch(e)
                    {console.error("Error during typing: ", e.message);}
                await sleep(typingSpeed[0],typingSpeed[1]);
                
                try
                {
                if (!checkChar(typedChar,actualWord.charAt(charSelection)))
                    {   
                        await driver.findElement(By.name("q")).sendKeys(Key.BACK_SPACE);log+='D';
                        await sleep(typingSpeed[0],typingSpeed[1]);
                        charSelection=charSelection-1;
                    }
                }
                catch(e)
                    {console.error("Error during typing: ", e.message);}

            }
            await driver.findElement(By.name("q")).sendKeys(Key.SPACE);log+=' ';
            
        }
        await driver.findElement(By.name("q")).sendKeys(Key.ENTER);
        await sleep(pageDelay[0],pageDelay[1]);
        console.log(log);
    } 
    catch(e)
        {console.error("Driver Iniziatization Failed",e.message);}
    finally 
        {if (driver) await driver.quit();}
}

async function sleep(min,max) {
        let pause = math.random();
        if (pause>.001)
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
function chosenChar(incorrectChoices,originalChar,chanceOfSuccess){
    let randomError = math.random();
    if(randomError>chanceOfSuccess)//determines if an error occured
        {   
            let randomNumber = randomNumberPortions(incorrectChoices.length);
            console.log(randomNumber);
            if(incorrectChoices[randomNumber]){//determines if an error is valid
                return incorrectChoices[randomNumber];
            }
            return originalChar;
        }
    else
        {
            return originalChar;
        }
}

function randomNumberPortions(total)
    {return total === 0?0:math.floor(math.random()*total);}

function checkChar(typedChar,actualChar)
    {return typedChar===actualChar}

function main()
{
    fetch("Sentences.json");
    console.log("Fetched!");
    //search(typingAccuracy,sentence,typingSpeed,pageDelay);
}

main();