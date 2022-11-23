import { useRouter } from "next/router";

export default function () {
    const {query} = useRouter()
    return (
        <div>
            <h1>Айди доски {query.id}</h1>
           BOARD!
        </div>
    );
};
