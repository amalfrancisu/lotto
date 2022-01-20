import { FC, Context } from "react";
import Blockchain from "./constants/blockchains";
import Network from "./constants/networks";
type Exact<A, B> = A extends B ? (B extends A ? A : never) : never;

export function makeHyperverseBlockchain<
  T extends HyperverseBlockchain<unknown>
>(payload: T): T {
  return payload;
}

export type HyperverseBlockchainInit<T> = (
  options: Hyperverse
) => Promise<BlockchainFeatures<T>>;

export type HyperverseBlockchain<T> = {
  name: Blockchain;
  context: () => any;
  provider: FC<any>;
  initialize: HyperverseBlockchainInit<T>;
};

export type BlockchainFeatures<T> = {
  client: any;
  explorer: string;
  extra?: T;
};
export type BlockchainFeatures2<T extends {}> = T & {
  client: any;
  explorer: string;
};

export type Hyperverse = {
  blockchain: HyperverseBlockchain<unknown>;
  network: Network;
  modules: HyperverseModule[];
};

export type HyperverseModule = {
  bundle: {
    Provider: FC<HyperverseModuleInstance>;
  };
  tenantId: string;
  network: Network;
  autoLoadContext: boolean;
  blockchain: Blockchain;
};

export type HyperverseModuleInstance = {
  tenantId: string;
  network: Network;
  blockchain: Blockchain;
};
