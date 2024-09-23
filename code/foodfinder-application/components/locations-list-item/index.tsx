import Link from "next/link";
import styles from "./index.module.css";
import { LocationType } from "mongoose/locations/schema";

interface PropsInterface {
    location: LocationType;
}

const LocationsListItem = (props: PropsInterface): JSX.Element => {
    const location = props.location;
    return (
        <>
            {location && (
                <li className={styles.root}>
                    <Link href={`/location/${location.location_id}`}>
                        <h2>
                            {String(location.name)}
                            <small className={styles.details}>
                                {String(location.cuisine)} in {String(location.borough)}
                            </small>
                        </h2>
                    </Link>
                </li>
            )}
        </>
    );
};

export default LocationsListItem;
