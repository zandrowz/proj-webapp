export default interface Station {
    AdvertisedLocationName: String,
    Geometry: {
        WGS84: String,
    }
    LocationSignature: String,
    PlatformLine: Array<String>,
}
