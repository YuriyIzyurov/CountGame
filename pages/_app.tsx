import '../styles/global.css'
import {StoreProvider} from "../store";

export default function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider {...pageProps}>
            <Component {...pageProps} />
        </StoreProvider>
        )
}