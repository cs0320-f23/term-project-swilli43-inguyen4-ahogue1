# backend flask server that takes has endpoints to query LLM & calculate user vector

from flask import Flask, request, g

import sys
import os
sys.path.append("./")

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from . import BERT_embedding_model

app = Flask(__name__)

user_history = [] # a list of all the suggestions a user has clicked on 
user_vector = 0

# to run locally & externally:
# flask run --host=0.0.0.0 --port=5001


""" Note: this will be used to:
    * pass in a suggestion when clicked on to add to the user vector
    * query the LLM to get a list of 10 suggestions
"""

@app.before_request
def before_request():
    # bpm, beats, num_beats = wav_to_bpm.extract_audio_data("panama.wav")
    # g.bpm = bpm
    # g.beats = beats
    # g.num_beats = num_beats

    pass

@app.route("/")
def homepage():
    return f"<p>Homepage: Backend Python Server of Journal Buddy!</p>"

""" params: takes in a suggestion (str) that was clicked on
    converts suggestion to a vector and updates the user_vector
    returns: a success message if the entry was successfully obtained
"""
@app.route("/suggestionClicked") # note: I am not using this endpoint currently
def updateSuggestionHistory():
    suggestionClicked = request.args.get('suggestionClicked')
    # /suggestionClicked=go for a walk

    # defensive programming: only return success if the suggestion is valid
    if (suggestionClicked != ""):

        user_history.append(suggestionClicked)
        response = {"result": "success"} 
    else:
        response = {"result": "error"}

    print(f"suggestion clicked: {suggestionClicked} was added to user history which now contains: \n{user_history}")
    return response


""" params: takes in user entry (& possibly the user vector)
    calls LLM to genearte a list of 10 suggestions
    compares the difference between each of the 10 suggestions and the user vector
    returns the top 3 suggestions, based on the cosine similarity
"""
@app.route("/getSuggestionList")
def generateSuggestionList():
    user_entry = request.args.get('entry')
    # user_vector = request.args.get('vector')
    # IPAddress/getSuggestionList?entry='mock user entry'

    pass




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
