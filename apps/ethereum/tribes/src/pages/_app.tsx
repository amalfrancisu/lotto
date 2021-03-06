import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, Provider } from '@decentology/hyperverse';
import { networks } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as Tribes from '@decentology/hyperverse-ethereum-tribes';
import * as RandomPick from '@decentology/hyperverse-ethereum-randompick';
import InnerComponent from '../components/InnerComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Change your Tenant ID here.
const TENANT_ID = '0x55C0b00aF5CdA1cB53d10aEc1cD24679F447fdfc';

function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Ethereum,
		network: networks.Testnet,
		storage: {
			options: { clientUrl: 'https://fileportal.org' }, // Updated to fileportal due to SSL error issues with SiaSky.net
		},
		modules: [
			{
				bundle: Tribes,
				tenantId: TENANT_ID,
			},
			{
				bundle: RandomPick,
				tenantId: null,
			},
		],
	});
	return (
		<Provider initialState={hyperverse}>
			<InnerComponent>
				<ToastContainer />
				<Component {...pageProps} />
			</InnerComponent>
		</Provider>
	);
}

export default MyApp;
