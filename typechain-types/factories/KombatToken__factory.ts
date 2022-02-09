/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { KombatToken, KombatTokenInterface } from "../KombatToken";

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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "deposit",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101606040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610140523480156200003757600080fd5b506040518060400160405280600c81526020016b25b7b6b130ba102a37b5b2b760a11b8152506040518060400160405280600681526020016512d3d350905560d21b81525081818180604051806040016040528060018152602001603160f81b81525084848160049080519060200190620000b492919062000251565b508051620000ca90600590602084019062000251565b5050825160209384012082519284019290922060e08390526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818901819052818301979097526060810194909452608080850193909352308483018190528151808603909301835260c09485019091528151919096012090529290925261012052506200016b9050600033620001a1565b620001977f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620001a1565b5050505062000334565b620001ad8282620001b1565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620001ad576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200020d3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b8280546200025f90620002f7565b90600052602060002090601f016020900481019282620002835760008555620002ce565b82601f106200029e57805160ff1916838001178555620002ce565b82800160010185558215620002ce579182015b82811115620002ce578251825591602001919060010190620002b1565b50620002dc929150620002e0565b5090565b5b80821115620002dc5760008155600101620002e1565b600181811c908216806200030c57607f821691505b602082108114156200032e57634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a05160c05160e051610100516101205161014051611cc96200038f6000396000610a910152600061117b015260006111ca015260006111a5015260006110fe01526000611128015260006111520152611cc96000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063a9059cbb11610097578063d505accf11610071578063d505accf14610397578063d5391393146103aa578063d547741f146103d1578063dd62ed3e146103e457600080fd5b8063a9059cbb1461035e578063b29a814014610371578063cf2c52cb1461038457600080fd5b806391d14854116100d357806391d148541461032857806395d89b411461033b578063a217fddf14610343578063a457c2d71461034b57600080fd5b806370a08231146102d957806379cc6790146103025780637ecebe001461031557600080fd5b80632f2ff15d1161016657806336568abe1161014057806336568abe146102a057806339509351146102b357806340c10f19146102c657806342966c681461026157600080fd5b80632f2ff15d14610276578063313ce567146102895780633644e5151461029857600080fd5b806318160ddd116101a257806318160ddd1461021957806323b872dd1461022b578063248a9ca31461023e5780632e1a7d4d1461026157600080fd5b806301ffc9a7146101c957806306fdde03146101f1578063095ea7b314610206575b600080fd5b6101dc6101d7366004611845565b61041d565b60405190151581526020015b60405180910390f35b6101f9610454565b6040516101e8919061189b565b6101dc6102143660046118ea565b6104e6565b6003545b6040519081526020016101e8565b6101dc610239366004611914565b6104fc565b61021d61024c366004611950565b60009081526020819052604090206001015490565b61027461026f366004611950565b6105ab565b005b610274610284366004611969565b6105b8565b604051600881526020016101e8565b61021d6105e3565b6102746102ae366004611969565b6105f2565b6101dc6102c13660046118ea565b610670565b6102746102d43660046118ea565b6106ac565b61021d6102e7366004611995565b6001600160a01b031660009081526001602052604090205490565b6102746103103660046118ea565b6106fc565b61021d610323366004611995565b61077d565b6101dc610336366004611969565b61079b565b6101f96107c4565b61021d600081565b6101dc6103593660046118ea565b6107d3565b6101dc61036c3660046118ea565b61086c565b61027461037f3660046118ea565b610879565b6102746103923660046119b0565b6109e2565b6102746103a5366004611a33565b610a3d565b61021d7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102746103df366004611969565b610ba1565b61021d6103f2366004611aa6565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b60006001600160e01b03198216637965db0b60e01b148061044e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606004805461046390611ad0565b80601f016020809104026020016040519081016040528092919081815260200182805461048f90611ad0565b80156104dc5780601f106104b1576101008083540402835291602001916104dc565b820191906000526020600020905b8154815290600101906020018083116104bf57829003601f168201915b5050505050905090565b60006104f3338484610bc7565b50600192915050565b6000610509848484610ceb565b6001600160a01b0384166000908152600260209081526040808320338452909152902054828110156105935760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6105a08533858403610bc7565b506001949350505050565b6105b53382610ebb565b50565b6000828152602081905260409020600101546105d48133611009565b6105de838361106d565b505050565b60006105ed6110f1565b905090565b6001600160a01b03811633146106625760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161058a565b61066c8282611218565b5050565b3360008181526002602090815260408083206001600160a01b038716845290915281205490916104f39185906106a7908690611b1b565b610bc7565b6106d67f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63361079b565b6106f25760405162461bcd60e51b815260040161058a90611b33565b61066c828261127d565b600061070883336103f2565b9050818110156107665760405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f77604482015263616e636560e01b606482015260840161058a565b6107738333848403610bc7565b6105de8383610ebb565b6001600160a01b03811660009081526006602052604081205461044e565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b60606005805461046390611ad0565b3360009081526002602090815260408083206001600160a01b0386168452909152812054828110156108555760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161058a565b6108623385858403610bc7565b5060019392505050565b60006104f3338484610ceb565b61088460003361079b565b6108a05760405162461bcd60e51b815260040161058a90611b33565b6040516370a0823160e01b815230600482015281906001600160a01b038416906370a082319060240160206040518083038186803b1580156108e157600080fd5b505afa1580156108f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109199190611b54565b10156109525760405162461bcd60e51b81526020600482015260086024820152672162616c616e636560c01b604482015260640161058a565b6001600160a01b03821663a9059cbb336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101849052604401602060405180830381600087803b1580156109aa57600080fd5b505af11580156109be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105de9190611b6d565b610a0c7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63361079b565b610a285760405162461bcd60e51b815260040161058a90611b33565b6105de83610a3883850185611950565b61127d565b83421115610a8d5760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e65000000604482015260640161058a565b60007f0000000000000000000000000000000000000000000000000000000000000000888888610abc8c61135c565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090506000610b1782611384565b90506000610b27828787876113d2565b9050896001600160a01b0316816001600160a01b031614610b8a5760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e61747572650000604482015260640161058a565b610b958a8a8a610bc7565b50505050505050505050565b600082815260208190526040902060010154610bbd8133611009565b6105de8383611218565b6001600160a01b038316610c295760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161058a565b6001600160a01b038216610c8a5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161058a565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038316610d4f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161058a565b6001600160a01b038216610db15760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161058a565b6001600160a01b03831660009081526001602052604090205481811015610e295760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161058a565b6001600160a01b03808516600090815260016020526040808220858503905591851681529081208054849290610e60908490611b1b565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610eac91815260200190565b60405180910390a35b50505050565b6001600160a01b038216610f1b5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161058a565b6001600160a01b03821660009081526001602052604090205481811015610f8f5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161058a565b6001600160a01b0383166000908152600160205260408120838303905560038054849290610fbe908490611b8f565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b611013828261079b565b61066c5761102b816001600160a01b031660146113fa565b6110368360206113fa565b604051602001611047929190611ba6565b60408051601f198184030181529082905262461bcd60e51b825261058a9160040161189b565b611077828261079b565b61066c576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556110ad3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561114a57507f000000000000000000000000000000000000000000000000000000000000000046145b1561117457507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b611222828261079b565b1561066c576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b0382166112d35760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161058a565b80600360008282546112e59190611b1b565b90915550506001600160a01b03821660009081526001602052604081208054839290611312908490611b1b565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b03811660009081526006602052604090208054600181018255905b50919050565b600061044e6113916110f1565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006113e38787878761159d565b915091506113f08161168a565b5095945050505050565b60606000611409836002611c1b565b611414906002611b1b565b67ffffffffffffffff81111561142c5761142c611c3a565b6040519080825280601f01601f191660200182016040528015611456576020820181803683370190505b509050600360fc1b8160008151811061147157611471611c50565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106114a0576114a0611c50565b60200101906001600160f81b031916908160001a90535060006114c4846002611c1b565b6114cf906001611b1b565b90505b6001811115611547576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061150357611503611c50565b1a60f81b82828151811061151957611519611c50565b60200101906001600160f81b031916908160001a90535060049490941c9361154081611c66565b90506114d2565b5083156115965760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161058a565b9392505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156115d45750600090506003611681565b8460ff16601b141580156115ec57508460ff16601c14155b156115fd5750600090506004611681565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611651573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661167a57600060019250925050611681565b9150600090505b94509492505050565b600081600481111561169e5761169e611c7d565b14156116a75750565b60018160048111156116bb576116bb611c7d565b14156117095760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161058a565b600281600481111561171d5761171d611c7d565b141561176b5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161058a565b600381600481111561177f5761177f611c7d565b14156117d85760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161058a565b60048160048111156117ec576117ec611c7d565b14156105b55760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b606482015260840161058a565b60006020828403121561185757600080fd5b81356001600160e01b03198116811461159657600080fd5b60005b8381101561188a578181015183820152602001611872565b83811115610eb55750506000910152565b60208152600082518060208401526118ba81604085016020870161186f565b601f01601f19169190910160400192915050565b80356001600160a01b03811681146118e557600080fd5b919050565b600080604083850312156118fd57600080fd5b611906836118ce565b946020939093013593505050565b60008060006060848603121561192957600080fd5b611932846118ce565b9250611940602085016118ce565b9150604084013590509250925092565b60006020828403121561196257600080fd5b5035919050565b6000806040838503121561197c57600080fd5b8235915061198c602084016118ce565b90509250929050565b6000602082840312156119a757600080fd5b611596826118ce565b6000806000604084860312156119c557600080fd5b6119ce846118ce565b9250602084013567ffffffffffffffff808211156119eb57600080fd5b818601915086601f8301126119ff57600080fd5b813581811115611a0e57600080fd5b876020828501011115611a2057600080fd5b6020830194508093505050509250925092565b600080600080600080600060e0888a031215611a4e57600080fd5b611a57886118ce565b9650611a65602089016118ce565b95506040880135945060608801359350608088013560ff81168114611a8957600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611ab957600080fd5b611ac2836118ce565b915061198c602084016118ce565b600181811c90821680611ae457607f821691505b6020821081141561137e57634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008219821115611b2e57611b2e611b05565b500190565b6020808252600790820152662161636365737360c81b604082015260600190565b600060208284031215611b6657600080fd5b5051919050565b600060208284031215611b7f57600080fd5b8151801515811461159657600080fd5b600082821015611ba157611ba1611b05565b500390565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611bde81601785016020880161186f565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611c0f81602884016020880161186f565b01602801949350505050565b6000816000190483118215151615611c3557611c35611b05565b500290565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600081611c7557611c75611b05565b506000190190565b634e487b7160e01b600052602160045260246000fdfea2646970667358221220c59b230a05155abc7a774f802d3801c9cb3eb148707491117322b0537c922cb064736f6c63430008090033";

type KombatTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KombatTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KombatToken__factory extends ContractFactory {
  constructor(...args: KombatTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "KombatToken";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<KombatToken> {
    return super.deploy(overrides || {}) as Promise<KombatToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): KombatToken {
    return super.attach(address) as KombatToken;
  }
  connect(signer: Signer): KombatToken__factory {
    return super.connect(signer) as KombatToken__factory;
  }
  static readonly contractName: "KombatToken";
  public readonly contractName: "KombatToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KombatTokenInterface {
    return new utils.Interface(_abi) as KombatTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KombatToken {
    return new Contract(address, _abi, signerOrProvider) as KombatToken;
  }
}
