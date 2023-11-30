// a wrapper component to list disclaimers 


// e.g.: data privacy discalimer
// medical disclaimer & hotline phone #
export default function disclaimers() {
    return (
        <div className="disclaimers">
        <p>Note on the suggestions: We use your journal response to generate personalized suggestions 
            using an open-source large language model and a recommendation algorithm</p>

        <p>This is not a substitute for medical help. If you are in crisis, please call the national 
            mental health hotline at (806)903-3787</p>

        </div>
    )
}