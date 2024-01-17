import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store'
import { UserContextProvider } from '../context/AuthContext'



export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
         <UserContextProvider>
          <Component {...pageProps} />
         </UserContextProvider>
       </Provider>
}
