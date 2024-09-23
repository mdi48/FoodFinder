import {
    findAllLocations,
    findLocationsById,
    onUserWishlist,
} from "mongoose/locations/services";

export const locationQueries = {

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    allLocations: async (_: any) => {
        return await findAllLocations();
    },
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    locationsById: async (_: any, param: { location_ids: string[] }) => {
        return await findLocationsById(param.location_ids);
    },
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUserWishlist: async (_: any, param: { user_id: string }) => {
        return await onUserWishlist(param.user_id);
    },
};
