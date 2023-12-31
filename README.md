# term-project-swilli43-inguyen4-ahogue1--

[Here](https://github.com/cs0320-f23/term-project-swilli43-inguyen4-ahogue1--) is our repo.

We created a journaling webapp that provides random daily reflection questions and offers personalized recommendations intended for college students struggling with or working on improving their mental health.

The web app has a journaling section that allows a user to journal according to the prompt, and then generates personalized suggestions using AI and a custom recommender system we built. 

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

## Design Choices

Here are some notable design choices that we made:

## Errors/Bugs

## Tests

## How to...

### Run our tests

### Build and run our program

## Future Work
We are all very passionate about mental health and wellbeing. We would love to grow the project in the future if we have time in an effort to make mental health more accessible. National MH data shows a significant lack of access and need for these resources among to college students and people everywhere. We would love to help democratize mental health by allowing simple data-driven tools like this increase access to mental health tools and resources. 

We see the following opportunities to build the project in the future:
1. Integrating with firebase to support multiple users through firebase auth & database
2. Add a cute loading animation so that while the user is waiting for their personalized results to come back, they know they are loading and have something engaging to look at
3. Add a shuffle prompt button
4. Add a dark mode button or keyboard shortcut that would allow the webpage to be displayed in a dark theme
