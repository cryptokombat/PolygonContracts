/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VombatFaucet, VombatFaucetInterface } from "../VombatFaucet";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vombat",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "allowedToWithdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "requestTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vombat",
    outputs: [
      {
        internalType: "contract IVombat",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "waitTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161030238038061030283398101604081905261002f91610067565b6001600160a01b03811661004257600080fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055610097565b60006020828403121561007957600080fd5b81516001600160a01b038116811461009057600080fd5b9392505050565b61025c806100a66000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632d291cad1461005c578063359cf2b714610084578063bb8493b91461008e578063ccca123b146100b9578063eec7faa1146100d0575b600080fd5b61006f61006a3660046101d0565b6100df565b60405190151581526020015b60405180910390f35b61008c610133565b005b6000546100a1906001600160a01b031681565b6040516001600160a01b03909116815260200161007b565b6100c261012c81565b60405190815260200161007b565b6100c267a688906bd8b0000081565b6001600160a01b03811660009081526001602052604081205461010457506001919050565b6001600160a01b038216600090815260016020526040902054421061012b57506001919050565b506000919050565b61013c336100df565b61014557600080fd5b6000546040516340c10f1960e01b815233600482015267a688906bd8b0000060248201526001600160a01b03909116906340c10f1990604401600060405180830381600087803b15801561019857600080fd5b505af11580156101ac573d6000803e3d6000fd5b5050505061012c426101be9190610200565b33600090815260016020526040902055565b6000602082840312156101e257600080fd5b81356001600160a01b03811681146101f957600080fd5b9392505050565b6000821982111561022157634e487b7160e01b600052601160045260246000fd5b50019056fea26469706673582212208cbb00ad3389269e4f0d8ce0ce7d32c1474bf3099e5fb1aa65a244a385629b9c64736f6c63430008090033";

type VombatFaucetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VombatFaucetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VombatFaucet__factory extends ContractFactory {
  constructor(...args: VombatFaucetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "VombatFaucet";
  }

  deploy(
    _vombat: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VombatFaucet> {
    return super.deploy(_vombat, overrides || {}) as Promise<VombatFaucet>;
  }
  getDeployTransaction(
    _vombat: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_vombat, overrides || {});
  }
  attach(address: string): VombatFaucet {
    return super.attach(address) as VombatFaucet;
  }
  connect(signer: Signer): VombatFaucet__factory {
    return super.connect(signer) as VombatFaucet__factory;
  }
  static readonly contractName: "VombatFaucet";
  public readonly contractName: "VombatFaucet";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VombatFaucetInterface {
    return new utils.Interface(_abi) as VombatFaucetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VombatFaucet {
    return new Contract(address, _abi, signerOrProvider) as VombatFaucet;
  }
}
