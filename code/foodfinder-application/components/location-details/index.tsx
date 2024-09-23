import { LocationType } from "mongoose/locations/schema";
import styles from "./index.module.css";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "../button/index";

interface PropsInterface {
    location: LocationType;
}

interface WishlistInterface {
    locationId: string;
    userId: string;
}

const LocationDetail = (props: PropsInterface): JSX.Element => {
    const location: LocationType = props.location;

    const { data: session } = useSession();
    const [onWishlist, setOnWishlist] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const userId = session?.user.fdlst_private_userId;
        setOnWishlist(
            userId && (location.on_wishlist as string[]).includes(userId) ? true : false
        );
    }, [session, location]);

    const wishlistAction = (props: WishlistInterface) => {
        const { locationId, userId } = props;
        if (loading) {
            return false;
        }
        setLoading(true);

        const action = !onWishlist ? "addWishlist" : "removeWishlist";
        fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `mutation wishlist {
                    ${action}(
                        location_id: "${locationId}",
                        user_id: "${userId}"
                    ) {
                        on_wishlist
                    }
                }`,
            }),
        })
        .then((result) => {
            if (result.status === 200) {
                setOnWishlist(action === "addWishlist" ? true : false);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            {location && (
                <ul className={styles.root}>
                    <li>
                        <b>Address: </b>
                        {location.address as string}
                    </li>
                    <li>
                        <b>Zipcode: </b>
                        {location.zipcode as string}
                    </li>
                    <li>
                        <b>Borough: </b>
                        {location.borough as string}
                    </li>
                    <li>
                        <b>Cuisine: </b>
                        {location.cuisine as string}
                    </li>
                    <li>
                        <b>Grade: </b>
                        {location.grade as string}
                    </li>
                </ul>
            )}

            {session?.user.fdlst_private_userId && (
                <Button
                    variant={!onWishlist ? "outline" : "blue"}
                    disabled={loading ? true : false}
                    clickHandler={() =>
                        wishlistAction({
                            locationId: location.location_id as string,
                            userId: session?.user.fdlst_private_userId as string,
                        })
                    }
                >
                    {onWishlist && <>Remove from your Wishlist</>}
                    {!onWishlist && <>Add to your Wishlist</>}
                </Button>
            )}
        </div>
    );
};
export default LocationDetail;
