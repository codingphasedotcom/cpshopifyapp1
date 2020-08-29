import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: "/graphql",
    fetchOptions: {
      credentials: 'include'
    },
    cache: new InMemoryCache()
  });
  

class MyApp extends App{
    render(){
        const { Component, pageProps } = this.props;
        const config = { 
            apiKey: SHOPIFY_API_KEY, 
            shopOrigin: Cookies.get("shopOrigin"), 
            forceRedirect: true 
        };

        return (
            <> 
                <Head>
                <title>Test App</title>
                <meta/>
                </Head>
                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <ApolloProvider client={client}>
                            <Component {...pageProps} />
                        </ApolloProvider>
                    </AppProvider>
                </Provider>
                
            </>
        )
    }
}

export default MyApp;