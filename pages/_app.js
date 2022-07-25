import '../styles/globals.css'
import '@aws-amplify/ui-react/styles.css'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import config from '../src/aws-exports'

Amplify.configure(config)

function MyApp({ Component, pageProps }) {
	return (
		<AmplifyProvider>
			<Component {...pageProps} />
		</AmplifyProvider>
	)
}

export default MyApp
