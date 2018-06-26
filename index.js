
const YOUTUBE_SEARCH_URL = 'googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
	const settings = {
		URL: YOUTUBE_SEARCH_URL
		data: {q: `${searchTerm} in:name`,
			part: 'snippet'
			key: 'AIzaSyBzsKggfulhYTpcUMpvKFb-NIUWfYCy9v8',
			per_page: 6
			},
		dataType: 'json',
		type: 'video'
		success: callback,
	};
	$.ajax(settings)
}

function renderResults(result){
	//load results of the search
	$('.results').html(
		`<a>${result.snippet.thumbnails.default}</a><br>
		<p>${result.snippet.description}</p>`
		)
	}

function getSearchData(data){
	//based on the query, this wil gather the data to put in the search. 
	const results = data.items.map((item, index) => 
	renderResults(item));
}

function handleSubmit(){
	//will load results when user hits submit button
	$('form').on('click', 'button', event{
		event.preventDefault();
		getSearchData()
	})
}

