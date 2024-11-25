import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h2>Page not able to be found</h2>
            <p>{error.data}</p>
        </div>
    );
}