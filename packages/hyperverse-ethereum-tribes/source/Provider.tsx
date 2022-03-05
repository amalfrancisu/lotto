import { createContext, FC } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { QueryClientProvider, QueryClient } from 'react-query';
import ABI from '../utils/Tribes.json';
import { HyperverseModuleInstance, networks, useHyperverse } from '@decentology/hyperverse';
import { Tribes } from './useTribes';
const client = new QueryClient();

export const ContractABI = ABI.abi;
export const CONTRACT_TESTNET_ADDRESS = '0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352';
export const TENANT_TESTNET_ADDRESS = '0x55C0b00aF5CdA1cB53d10aEc1cD24679F447fdfc';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	if (network === networks.Mainnet && tenantId == null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<Tribes.Provider initialState={{ tenantId: tenantId || TENANT_TESTNET_ADDRESS }}>
				{children}
			</Tribes.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
