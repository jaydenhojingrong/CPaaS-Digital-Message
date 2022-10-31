function extractData(payload) {
    return [
        payload["data"]["entry"]["messages"],
        payload["data"]["entry"]["channels_to_publish"],
        payload["data"]["entry"]["content_type"],
        payload["data"]["entry"]["rich_media"],
        payload["data"]["entry"]["audience_group"]   
        // payload["data"]["entry"]["link_file"]
    ];

}

export { extractData };