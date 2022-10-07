function extractData (payload){

    // extract data -> entry -> channels
    // extract data -> entry -> messages
    return [payload["data"]["entry"]["messages"], payload["data"]["entry"]["channels"], payload["data"]["entry"]["contact_id"], payload["data"]["entry"]["images_videos"]];
    
}

export { extractData };