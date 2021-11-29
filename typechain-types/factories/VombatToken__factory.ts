/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VombatToken, VombatTokenInterface } from "../VombatToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "recoverToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101406040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610120523480156200003757600080fd5b506040518060400160405280600c81526020016b2b37b6b130ba102a37b5b2b760a11b815250604051806040016040528060068152602001651593d350905560d21b8152508180604051806040016040528060018152602001603160f81b81525084848160049080519060200190620000b292919062000247565b508051620000c890600590602084019062000247565b5050825160209384012082519284019290922060c083815260e08290524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818a01819052818301989098526060810195909552608080860193909352308583015280518086039092018252939092019092528051940193909320909252610100525062000163905060003362000197565b6200018f7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63362000197565b50506200032a565b620001a38282620001a7565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620001a3576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620002033390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b8280546200025590620002ed565b90600052602060002090601f016020900481019282620002795760008555620002c4565b82601f106200029457805160ff1916838001178555620002c4565b82800160010185558215620002c4579182015b82811115620002c4578251825591602001919060010190620002a7565b50620002d2929150620002d6565b5090565b5b80821115620002d25760008155600101620002d7565b600181811c908216806200030257607f821691505b602082108114156200032457634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a05160c05160e0516101005161012051611bbe6200037a6000396000610a2101526000610f8901526000610fd801526000610fb301526000610f3701526000610f600152611bbe6000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c806370a08231116100de578063a457c2d711610097578063d505accf11610071578063d505accf1461034e578063d539139314610361578063d547741f14610388578063dd62ed3e1461039b57600080fd5b8063a457c2d714610315578063a9059cbb14610328578063b29a81401461033b57600080fd5b806370a08231146102a357806379cc6790146102cc5780637ecebe00146102df57806391d14854146102f257806395d89b4114610305578063a217fddf1461030d57600080fd5b80632f2ff15d1161014b57806336568abe1161012557806336568abe14610257578063395093511461026a57806340c10f191461027d57806342966c681461029057600080fd5b80632f2ff15d1461022b578063313ce567146102405780633644e5151461024f57600080fd5b806301ffc9a71461019357806306fdde03146101bb578063095ea7b3146101d057806318160ddd146101e357806323b872dd146101f5578063248a9ca314610208575b600080fd5b6101a66101a13660046119c4565b6103d4565b60405190151581526020015b60405180910390f35b6101c361040b565b6040516101b29190611a79565b6101a66101de366004611941565b61049d565b6003545b6040519081526020016101b2565b6101a6610203366004611895565b6104b3565b6101e761021636600461198a565b60009081526020819052604090206001015490565b61023e6102393660046119a2565b610562565b005b604051601281526020016101b2565b6101e761058d565b61023e6102653660046119a2565b61059c565b6101a6610278366004611941565b61061a565b61023e61028b366004611941565b610656565b61023e61029e36600461198a565b6106c0565b6101e76102b1366004611849565b6001600160a01b031660009081526001602052604090205490565b61023e6102da366004611941565b6106cd565b6101e76102ed366004611849565b61074e565b6101a66103003660046119a2565b61076c565b6101c3610795565b6101e7600081565b6101a6610323366004611941565b6107a4565b6101a6610336366004611941565b61083d565b61023e610349366004611941565b61084a565b61023e61035c3660046118d0565b6109cd565b6101e77f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61023e6103963660046119a2565b610b31565b6101e76103a9366004611863565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b60006001600160e01b03198216637965db0b60e01b148061040557506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606004805461041a90611b3d565b80601f016020809104026020016040519081016040528092919081815260200182805461044690611b3d565b80156104935780601f1061046857610100808354040283529160200191610493565b820191906000526020600020905b81548152906001019060200180831161047657829003601f168201915b5050505050905090565b60006104aa338484610b57565b50600192915050565b60006104c0848484610c7b565b6001600160a01b03841660009081526002602090815260408083203384529091529020548281101561054a5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6105578533858403610b57565b506001949350505050565b60008281526020819052604090206001015461057e8133610e4b565b6105888383610eaf565b505050565b6000610597610f33565b905090565b6001600160a01b038116331461060c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610541565b6106168282611026565b5050565b3360008181526002602090815260408083206001600160a01b038716845290915281205490916104aa918590610651908690611aac565b610b57565b6106807f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63361076c565b6106b65760405162461bcd60e51b81526020600482015260076024820152662161636365737360c81b6044820152606401610541565b610616828261108b565b6106ca338261116a565b50565b60006106d983336103a9565b9050818110156107375760405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f77604482015263616e636560e01b6064820152608401610541565b6107448333848403610b57565b610588838361116a565b6001600160a01b038116600090815260066020526040812054610405565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b60606005805461041a90611b3d565b3360009081526002602090815260408083206001600160a01b0386168452909152812054828110156108265760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610541565b6108333385858403610b57565b5060019392505050565b60006104aa338484610c7b565b61085560003361076c565b61088b5760405162461bcd60e51b81526020600482015260076024820152662161636365737360c81b6044820152606401610541565b6040516370a0823160e01b815230600482015281906001600160a01b038416906370a082319060240160206040518083038186803b1580156108cc57600080fd5b505afa1580156108e0573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090491906119ec565b101561093d5760405162461bcd60e51b81526020600482015260086024820152672162616c616e636560c01b6044820152606401610541565b6001600160a01b03821663a9059cbb336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381600087803b15801561099557600080fd5b505af11580156109a9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610588919061196a565b83421115610a1d5760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152606401610541565b60007f0000000000000000000000000000000000000000000000000000000000000000888888610a4c8c6112b8565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090506000610aa7826112e0565b90506000610ab78287878761132e565b9050896001600160a01b0316816001600160a01b031614610b1a5760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152606401610541565b610b258a8a8a610b57565b50505050505050505050565b600082815260208190526040902060010154610b4d8133610e4b565b6105888383611026565b6001600160a01b038316610bb95760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610541565b6001600160a01b038216610c1a5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610541565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038316610cdf5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610541565b6001600160a01b038216610d415760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610541565b6001600160a01b03831660009081526001602052604090205481811015610db95760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610541565b6001600160a01b03808516600090815260016020526040808220858503905591851681529081208054849290610df0908490611aac565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e3c91815260200190565b60405180910390a35b50505050565b610e55828261076c565b61061657610e6d816001600160a01b03166014611356565b610e78836020611356565b604051602001610e89929190611a04565b60408051601f198184030181529082905262461bcd60e51b825261054191600401611a79565b610eb9828261076c565b610616576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610eef3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60007f0000000000000000000000000000000000000000000000000000000000000000461415610f8257507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b611030828261076c565b15610616576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b0382166110e15760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610541565b80600360008282546110f39190611aac565b90915550506001600160a01b03821660009081526001602052604081208054839290611120908490611aac565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0382166111ca5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610541565b6001600160a01b0382166000908152600160205260409020548181101561123e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610541565b6001600160a01b038316600090815260016020526040812083830390556003805484929061126d908490611ae3565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b6001600160a01b03811660009081526006602052604090208054600181018255905b50919050565b60006104056112ed610f33565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b600080600061133f8787878761153f565b9150915061134c8161162c565b5095945050505050565b60606000611365836002611ac4565b611370906002611aac565b67ffffffffffffffff81111561139657634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156113c0576020820181803683370190505b509050600360fc1b816000815181106113e957634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061142657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600061144a846002611ac4565b611455906001611aac565b90505b60018111156114e9576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061149757634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106114bb57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936114e281611b26565b9050611458565b5083156115385760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610541565b9392505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156115765750600090506003611623565b8460ff16601b1415801561158e57508460ff16601c14155b1561159f5750600090506004611623565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156115f3573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661161c57600060019250925050611623565b9150600090505b94509492505050565b600081600481111561164e57634e487b7160e01b600052602160045260246000fd5b14156116575750565b600181600481111561167957634e487b7160e01b600052602160045260246000fd5b14156116c75760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610541565b60028160048111156116e957634e487b7160e01b600052602160045260246000fd5b14156117375760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610541565b600381600481111561175957634e487b7160e01b600052602160045260246000fd5b14156117b25760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610541565b60048160048111156117d457634e487b7160e01b600052602160045260246000fd5b14156106ca5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610541565b80356001600160a01b038116811461184457600080fd5b919050565b60006020828403121561185a578081fd5b6115388261182d565b60008060408385031215611875578081fd5b61187e8361182d565b915061188c6020840161182d565b90509250929050565b6000806000606084860312156118a9578081fd5b6118b28461182d565b92506118c06020850161182d565b9150604084013590509250925092565b600080600080600080600060e0888a0312156118ea578283fd5b6118f38861182d565b96506119016020890161182d565b95506040880135945060608801359350608088013560ff81168114611924578384fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611953578182fd5b61195c8361182d565b946020939093013593505050565b60006020828403121561197b578081fd5b81518015158114611538578182fd5b60006020828403121561199b578081fd5b5035919050565b600080604083850312156119b4578182fd5b8235915061188c6020840161182d565b6000602082840312156119d5578081fd5b81356001600160e01b031981168114611538578182fd5b6000602082840312156119fd578081fd5b5051919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611a3c816017850160208801611afa565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611a6d816028840160208801611afa565b01602801949350505050565b6020815260008251806020840152611a98816040850160208701611afa565b601f01601f19169190910160400192915050565b60008219821115611abf57611abf611b72565b500190565b6000816000190483118215151615611ade57611ade611b72565b500290565b600082821015611af557611af5611b72565b500390565b60005b83811015611b15578181015183820152602001611afd565b83811115610e455750506000910152565b600081611b3557611b35611b72565b506000190190565b600181811c90821680611b5157607f821691505b602082108114156112da57634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fdfea2646970667358221220026bb1fd98ec555f1ceee9a0ee6b43916a6fa8f330602733ca1c15df1a0b201f64736f6c63430008040033";

type VombatTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VombatTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VombatToken__factory extends ContractFactory {
  constructor(...args: VombatTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VombatToken> {
    return super.deploy(overrides || {}) as Promise<VombatToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): VombatToken {
    return super.attach(address) as VombatToken;
  }
  connect(signer: Signer): VombatToken__factory {
    return super.connect(signer) as VombatToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VombatTokenInterface {
    return new utils.Interface(_abi) as VombatTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VombatToken {
    return new Contract(address, _abi, signerOrProvider) as VombatToken;
  }
}
