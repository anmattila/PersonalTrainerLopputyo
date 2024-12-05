import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h2>Page not able to be found</h2>
            <a href="/">Back to customers</a>
            <p>{error.data}</p>
        </div>
    );
}