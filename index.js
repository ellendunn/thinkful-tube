
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
  const obj = {
    q: `${searchTerm}`,
		// per_page: 5,
    part: 'snippet',
	  key:'AIzaSyBzsKggfulhYTpcUMpvKFb-NIUWfYCy9v8'
	}
	const settings = {
		url: YOUTUBE_SEARCH_URL,
		data: obj,
		// dataType: 'jsonp',
		// type: 'video',
		success: callback,
    // error: err => console.log(err)
 	};
	$.ajax(settings)
}

function renderResults(result){
	//load results of the search

  const img = `https://img.youtube.com/vi/${result.id.videoId}/2.jpg`;
  const vid = `https://www.youtube.com/watch?v=${result.id.videoId}`;

  return `<a href='${vid}' target='_blank' class='video-link'>${result.snippet.title}</a><br>
    <a target='_blank' href='${vid}'>
    <img src = ${img} alt='${result.snippet.description}' />
    </a><br>`
	}

function showTotalResults(total) {
  const totalResultsHtml = `<p>Found ${total} results in this search`;

   $('.results').html(totalResultsHtml);

}

function getSearchData(data){
	//based on the query, this wil gather the data to put in the search.
  // console.log(data); 
	const results = data.items.map((item, index) => renderResults(item));
  $('.results').append(results);
  // getTotalResults(); 
  const totalResults = `${data.pageInfo.totalResults}`;

  showTotalResults(totalResults);

  const outputElem = $('.results');

  outputElem
    .prop('hidden', false)
    .append(results);
}

function handleSubmit(){
	//will get results when user hits submit button
  $('.search-form').submit(event => {
		event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#js-query');
    const query = queryTarget.val();
    queryTarget.val('');
		getDataFromApi(query, getSearchData);
	})
}

handleSubmit()


