import { useParams } from "react-router-dom"

export function Error404() {
    const { path } = useParams<{ path: string }>();

    return (
        <>
            <h1>Page "/{path}" Not Found</h1>
        </>
    )
}
