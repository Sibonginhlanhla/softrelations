/**
 * This method cleans the URL.
 * remove trailing '/' and truncate any route parameters
 */
function cleanURL(_url, _hasParam=false){
    
    if (_url != '/' && _url.charAt(_url.length-1)=='/'){
        _url = _url.slice(0,_url.length-1);
    }
    if (_hasParam){ // convention, 1 route param at end
        const urlTokens = _url.split("/");
        // first string is empty, so join results in '/' on left
        _url = (urlTokens.slice(0,urlTokens.length-1)).join('/')
    }

    return _url;
}


module.exports = {
    cleanURL
}