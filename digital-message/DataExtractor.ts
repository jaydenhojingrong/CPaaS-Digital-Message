function extractData (payload){

    // extract data -> entry -> channels
    // extract data -> entry -> messages
    return [payload["data"]["entry"]["messages"], payload["data"]["entry"]["channels"][0]];
    
    
}

export { extractData };