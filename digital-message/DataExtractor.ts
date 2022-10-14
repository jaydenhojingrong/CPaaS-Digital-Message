function extractData(payload) {

    // extract data -> entry -> channels
    // extract data -> entry -> messages
    // return [
    //     payload["data"]["entry"]["messages"],
    //     payload["data"]["entry"]["channels"],
    //     payload["data"]["entry"]["contact_id"],
    //     payload["data"]["entry"]["file"],
    //     payload["data"]["entry"]["link"]
    // ];
    return [
        payload["data"]["entry"]["messages"],
        payload["data"]["entry"]["channels_to_publish"],
        payload["data"]["entry"]["content_type"],
        payload["data"]["entry"]["rich_media"],
        payload["data"]["entry"]["link_file"]
    ];

}

export { extractData };