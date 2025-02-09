Selenium Auto-Searcher Project

Overview
    This project is a basic auto-searcher designed to execute a predetermined list of queries. Its behavior is designed to mimic human-like typing, including occasional mistakes and corrections.
    
    Initially created to explore web scraping, this project servers as a foundational step in learning about the field. While it is functional, I do not consider it a comprehensive example of web scraping expertise.

How to Run
    This project is executed in the terminal of the IDE. To set it up and run:

    -Clone the repository from the GitHub link.
    -Install the required libraries:
    -Node.js: Install it globally if not already installed.
    -Mistyped: Install using npm install mistyped.
    -Any additional libraries can be installed using npm install with the provided package.json.
    -Navigate to the project directory.
    -Run the script using the following command:
        node .\main.js

Purpose
    The main purpose of this project is to:
    -Perform automated searches in a human-like manner.
    -Gain hands-on experience with Selenium and related tools.
    -Serve as an introduction to the JavaScript enviorment in preparation for future web development.

Features
    -Human-like typing
        -mimics real typing by introducing delays.
        -Occasionally introduces typing errors and corrects them.
    -Customizable Queries:
        -Loads sentneces for ecternal JSON files for flexibility.
    -Randomized Behavior:
        -Utilized the mathjs library to generate random delays for typing.
    -Web Scraping:
        -Uses the Selenium library to interact with web pages.

Tools and Libraries
    -Selennium:For web scraping and browser interaction
    -Math.js:For generating random numbers to simulater typing speeds and selecting instances and types on incorrect inputs.
    -Json:For managing and loading custom search queries.
    -Node.js: To worki in the JavaScript enviorment, leveraging its deafult async/await for handling asynchronous operations.

Limitations
    -Typing Patteren:
        -Randomized speeds lack the natural rythm of real typing curves.
    -Search Behavior:
        -limited searches.
        -No follow-up on searches made.
        -remains idle after entering a search.
    -Limited Anti-bot resistance:
        - Cannot handle dynamic sites with advanced anti botting resistances, such as grids-based elements and CAPTCHA's.
Future Impovements
    -Google Trends intergration
        -Utilize googles API to fetch popular search trends for dynamic query generation.
    -Typing Simulation
        -Collect personal data to train a machine learning model that better mimics natural typing habits
    -Dynamic site handiling
        -Learn techniques to be able to handle websites with complex anti-bot tools and dynamic elements.
    -Improved Search Functionality:
        -Implement navigation and interactions on the search results page
Lesson Learned
    -The basics of web scraping using Selenium.
    -The advantages of Node.js's async features for handling files and enviorments.
    -Libraries and tools int he JS ecosystem that are useful for automation tasks.
Acknowledgments
    This project started as a learning initiative, and while it began as an attempt to work with automated searches, it quickly grew into a more meaningful exploration of web scraping and JavaScript development.

