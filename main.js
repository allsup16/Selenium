import {create,all, random, e} from 'mathjs';
import { readFile } from 'fs/promises';
import path from 'path';
import {Builder,By,Key, promise} from "selenium-webdriver";
import Mistyped from 'mistyped';
import { fileURLToPath } from 'url';

const math = create(all);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
/*mistyped options
dimension 2: the range of potentially wrong chars for each chars
*/ 
const options = 
{
    dimension: 2,
}
//local location of json file
const filepath = 'Sentences.json';
let typingAccuracy = .95;
let typingSpeed=[.2,.3];
let pageDelay=[10,20];

/*
Functionality: Opens a browser and search engine, then will write a sentence in the search bar.
    Once the sentence is finished search the result. Finally closes the page after a timeout.
Parameters:
    typingAccuracy: How accurate the bot will be when typing out a sentence.
    sentence: The sentence that will be typed out.
    typingSpeed: 2 numbers that represent how fast the bot will type out the sentence
    pageDelay: How long after the search will the bot remain on the page before closing page.
    searchEngine: which search engine will be used.
*/
async function search(typingAccuracy,sentence,typingSpeed,pageDelay,searchEngine){
    let driver;
    try
    {
        driver = await new Builder().forBrowser("MicrosoftEdge").build();
        await driver.get(searchEngine);
        let sentenceSplit = sentence.split(" ");
        for (let wordSelection = 0; wordSelection<sentenceSplit.length;wordSelection++)
        {
            let actualWord = sentenceSplit[wordSelection];
            for(let charSelection =0; charSelection<actualWord.length;charSelection++)
            {
                let mistypedChar = Mistyped(sentenceSplit[wordSelection].charAt(charSelection),options);// gives a list of possible incorrect chars that can be chosen.
                
                let typedChar = chosenChar(mistypedChar,actualWord.charAt(charSelection),typingAccuracy);// determines wheter char is right or wrong.
                try
                    {await driver.findElement(By.name("q")).sendKeys(typedChar);}
                catch(e)
                    {console.error("Error during typing: ", e.message);}
                await sleep(typingSpeed[0],typingSpeed[1]);
                
                try
                {
                if (!checkChar(typedChar,actualWord.charAt(charSelection)))
                    {   
                        await driver.findElement(By.name("q")).sendKeys(Key.BACK_SPACE);
                        await sleep(typingSpeed[0],typingSpeed[1]);
                        charSelection=charSelection-1;
                    }
                }
                catch(e)
                    {console.error("Error during typing: ", e.message);}

            }
            await driver.findElement(By.name("q")).sendKeys(Key.SPACE);
            await sleep(typingSpeed[0],typingSpeed[1]);
        }
        await driver.findElement(By.name("q")).sendKeys(Key.ENTER);
        await sleep(pageDelay[0],pageDelay[1]);
    } 
    catch(e)
        {console.error("Driver Iniziatization Failed",e.message);}
    finally 
        {if (driver) await driver.quit();}
}
/*
Functionality: adds a delay to simulate a human pause.
Parameters:
    min: number represents the lower end of timeout time
    max: number represents the upper end of timeout time
    disractable: a boolean that is used to determine if a delay can happen that represents a human getteing distracted.
Return:
    a promise that will slow the script down.
*/
async function sleep(min,max,disractable) {
        let pause = math.random();
        if (pause>.001)
        {
            let delay = (min+(max-min)*pause)*1000;
            return new Promise(resolve=>(setTimeout(resolve,delay)));
        }
        else if(disractable)
        {
            let distraction_min=3;
            let distraction_max=7;
            let disrtaction_delay = (distraction_min+(distraction_max-distraction_min)*pause)*1000;
            return new Promise(resolve=>(setTimeout(resolve,disrtaction_delay)));
        }
}

/*
Functionality: takes a list of potential choices and decides if a char is the 
                original or an incorrect char. 
Parameters:
    incorrectChoices: list of potential choices, that are near the original choice.
    originalChar: what the Char is in the sentence.
    chanceOfSuccess: How likley is it that the originalChar is chosen. 
Return: 
    Char that will be put into the sentence.
*/
function chosenChar(incorrectChoices,originalChar,chanceOfSuccess){
    let errorChance = math.random();
    if(errorChance>chanceOfSuccess)//determines if an error occured
        {   
            let randomNumber = randomNumberPortions(incorrectChoices.length);
            if(incorrectChoices[randomNumber]){//determines if an error is valid
                return incorrectChoices[randomNumber];
            }
            return originalChar;
        }
    else
        {return originalChar;}
}

/*
Functionality: Gives a number between one and the total number of options
Parameters: 
    total: total number of options avaliable
Return: a number between 0 and total
*/
function randomNumberPortions(total)
    {return total === 0?0:math.floor(math.random()*total);}

/*
Functionality: Checks to see if the typed char and actual char are the same
Parameters:
    typedChar: the char typed in the search engine.
    actualChar: What the char is in the sentence.
Return: Boolean saying if they are the same.
*/
function checkChar(typedChar,actualChar)
    {return typedChar===actualChar}

/*
Functionality: sets the search engine and reads the json file that contains all the sentences.
The main will take a random sentence from the json file and search it every so many
minutes. 
*/
async function main()
{
    let searchEngine = "https://www.google.com";
    readFile(filepath,'utf-8')
        .then(async data=>{
            const sentencesObj= JSON.parse(data);
            const sentences = sentencesObj.Sentences;


            for(let searches = 0; searches<5;searches++)
                {
                    await search(typingAccuracy,sentences[randomNumberPortions(sentences.length)],typingSpeed,pageDelay,searchEngine);
                    await sleep(3000,12000,false);
                }


        }).catch(err =>{
            console.error("Error reading file: ",err.message);
        });
    
    

}

main();