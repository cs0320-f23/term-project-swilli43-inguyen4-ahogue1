# Journal Buddy: A Wellbeing Journal With Personalized AI-Driven Wellbeing Suggestions

[Here](https://github.com/cs0320-f23/term-project-swilli43-inguyen4-ahogue1--) is our repo.

We created a journaling webapp that provides random daily reflection questions and offers personalized recommendations intended for college students struggling with or working on improving their mental health.

<img width="1000" alt="Screenshot 2023-12-31 at 11 25 55 AM" src="https://github.com/cs0320-f23/term-project-swilli43-inguyen4-ahogue1/assets/113455000/e6bc1331-bc97-4a8f-8a79-aaf1ffc60f16">


The web app has a journaling section that allows a user to journal according to the prompt, and then generates personalized suggestions using AI and a custom recommender system we built. 

<img width="1000" alt="Screenshot 2023-12-31 at 11 21 26 AM" src="https://github.com/cs0320-f23/term-project-swilli43-inguyen4-ahogue1/assets/113455000/6523945b-d9ce-47c3-b966-520f03336750">

We also added mocked log ins and registration pages to the repo, with the idea of integrating with firebase in the future.

## How Our Personalized Suggestions & Recommender System Works
When the user selects the "generate wellbeing suggestions" button, their journal entry is sent to an AI model (openAI's chat endpoint) to generate 10 personalized wellbeing suggestions based on their response. That information is parsed into a list of 10 strings. From there, we convert each wellbeing suggestion into a vector embedding. We represent the user as a vector embedding of the average of the past wellbeing activities they have completed (since each suggestion has a check box that can be selected to indicate the activity has been completed). We then calculate the difference between each suggestion and the user vector, and display the three suggestions most similar to the wellbeing activities that the user has clicked on in the past. We did this to maximize engagement (and because early system tests revealed a decent level of variety and randomness for our purposes). However, we also note that a future work could be to include an option to display the 3 most different suggestions, to maximize the variety of suggestions displayed with the intent of suggesting new ideas that could help get someone out of a rut. 

## Accessibility and Engagement Features
**Accessibility**
Accessibility features include keyboard shortcuts that make the web app fully accessible to users who cannot use a mouse. 
Keyboard shortcuts are:

**Engagement Features** 
Our stakeholder interviews and lived experiences led us to realize that there is a significant problem with sustained engagement with mental health apps. In addition to the personalzied functionality, we added a cute, random plant graphic that is displayed for each journal entry when the user clicks the generate wellbeing suggestions button. Based on stakeholder suggestions, we sought to create a fun, simple engagement feature that could incentivize sustained use, similar to Plant Nanny.

## About the Team
Team githubs: ahogue1, swilli43, and inguyen4.  
Selena (swilli43) is studying computer science at Brown University (2025) and is minoring in Entrepeneurship.  
Ilana (inguyen4) is studying computer science at Brown University (2026).  
Alex (ahogue1) is studying computer science and visual arts at Brown University and the Rhode Island School of Design (RISD) as a dual degree student.

## Future Work
We are all very passionate about mental health and wellbeing. We would love to grow the project in the future if we have time in an effort to make mental health more accessible. National MH data shows a significant lack of access and need for these resources among to college students and people everywhere. We would love to help democratize mental health by allowing simple data-driven tools like this increase access to mental health tools and resources. 

We see the following opportunities to build the project in the future:
1. Integrating with firebase to support multiple users through firebase auth & database
2. Add a cute loading animation so that while the user is waiting for their personalized results to come back, they know they are loading and have something engaging to look at
3. Add a shuffle prompt button
4. Add a dark mode button or keyboard shortcut that would allow the webpage to be displayed in a dark theme

## Design Choices

We have two backend servers. The first is a flask (python) server which handles (1) calls to the OpenAI API, (2) converting suggestions and user history to vector embeddings via the open source BERT embeddings model, and (3) calculating and returning the top 3 personalized suggestions.

The second backend server is a java server that handles high level program logic including storing the user history locally on the backend and storing the journal entry, suggestion history, and prompt list. 

Lastly, we have a front end server written using typescript and react which we use to house the front end logic of the website, buttons, css styling, etc.

## Errors/Bugs

We are making 2 calls to the OpenAI API instead of 1 somewhere in the backend server so the suggestions will render and then re-render with new suggestions when they should only render once when the submit for suggestions button is pressed.

## Tests

We have unit, system and integration tests for our program including front end tests and unit testing in java.

## How to...

### Build and run our program
(1) update the OpenAI API key in line 21 of backend_py/src/BERT_embedding_model.py to a valid API key
(2) cd into backend directory and run the server file
(3) cd into backend_py, activate the environment (env), then cd into src and run flask run --host=0.0.0.0 --port=5001 to run the backend python server
(4) update the flask server IP address in frontend/src/SuggestionDisplay line 39 to be whatever the public IP address that the backend_py flask server is running on (this will be the second IP address that prints out when you run the command in step 2)
(5) run the front end server by running ‘npm run dev’ in frontend/src

### Run our tests

To run our integration tests: run App.spec.ts using playwright in frontend/tests/
To run our mocked tests:
* switch to mocked mode by using the keyboard shortcut ctrl + shift + m
* run mock.spec.ts using playwright in frontend/tests/mocks
