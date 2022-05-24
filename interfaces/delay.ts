import Location from './Location';

export default interface Delay {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    AdvertisedTrainIdent: string,
    Canceled: Boolean,
    EstimatedTimeAtLocation: string,
    FromLocation: Array<Location>,
    ToLocation: Array<Location>,
}