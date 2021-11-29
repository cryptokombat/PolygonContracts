/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { KombatGame, KombatGameInterface } from "../KombatGame";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IVombat",
        name: "_vombat",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasure",
        type: "address",
      },
      {
        internalType: "contract ICollection",
        name: "_collectionEth",
        type: "address",
      },
      {
        internalType: "contract ICollection",
        name: "_collectionBsc",
        type: "address",
      },
      {
        internalType: "contract ICollection",
        name: "_consumables",
        type: "address",
      },
      {
        internalType: "contract IERC721",
        name: "_arena",
        type: "address",
      },
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "loser",
        type: "address",
      },
    ],
    name: "PVPKombat",
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
        internalType: "uint256",
        name: "winnerShare",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "stakerShare",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "arenaShare",
        type: "uint256",
      },
    ],
    name: "SharesSet",
    type: "event",
  },
  {
    inputs: [],
    name: "AUTOMATION_ROLE",
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
    name: "BASE_BP",
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
    name: "arenaShare",
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
    name: "arenas",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collectionBsc",
    outputs: [
      {
        internalType: "contract ICollection",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collectionEth",
    outputs: [
      {
        internalType: "contract ICollection",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "consumables",
    outputs: [
      {
        internalType: "contract ICollection",
        name: "",
        type: "address",
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
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "collection",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "heroId",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "consumables",
            type: "uint256[]",
          },
        ],
        internalType: "struct KombatGame.KombatStruct",
        name: "winner",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "collection",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "heroId",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "consumables",
            type: "uint256[]",
          },
        ],
        internalType: "struct KombatGame.KombatStruct",
        name: "loser",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "arenaId",
        type: "uint256",
      },
    ],
    name: "processPVPKombat",
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
        internalType: "uint256",
        name: "_winnerShare",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_stakerShare",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_arenaShare",
        type: "uint256",
      },
    ],
    name: "setShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasure",
        type: "address",
      },
    ],
    name: "setTreasure",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_winReward",
        type: "uint256",
      },
    ],
    name: "setWinReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakerShare",
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
    name: "stakingContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    name: "treasure",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
    name: "winReward",
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
    name: "winnerShare",
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
  "0x6101c0604052611770600255610bb8600355610fa0600455670de0b6b3a76400006007553480156200003057600080fd5b5060405162001d7838038062001d7883398101604081905262000053916200025d565b604080518082018252600b81526a4b6f6d6261742047616d6560a81b6020808301918252835180850185526001808252603160f81b9183019190915280559151902060c08181527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660e08190524660a081815286517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8188018190528189019690965260608082019490945260808082019390935230818301528751808203909201825290930190955281519190930120909252610100919091526001600160601b031988821b811661012052600580546001600160a01b038a81166001600160a01b03199283161790925588841b83166101405287841b83166101605286841b8316610180529285901b9091166101a0526006805491841691909216179055620001a0600033620001ad565b5050505050505062000320565b620001b98282620001bd565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620001b9576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620002193390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600080600080600080600060e0888a03121562000278578283fd5b8751620002858162000307565b6020890151909750620002988162000307565b6040890151909650620002ab8162000307565b6060890151909550620002be8162000307565b6080890151909450620002d18162000307565b60a0890151909350620002e48162000307565b60c0890151909250620002f78162000307565b8091505092959891949750929550565b6001600160a01b03811681146200031d57600080fd5b50565b60805160a05160c05160e051610100516101205160601c6101405160601c6101605160601c6101805160601c6101a05160601c6119a3620003d5600039600081816103ae0152610dad01526000818161026e015281816108b6015261095b01526000610387015260006102c0015260008181610302015281816110850152818161113301526111e101526000610b8101526000610bd001526000610bab01526000610b2f01526000610b5801526119a36000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c806391d14854116100de578063e3ae85f011610097578063ee99205c11610071578063ee99205c1461035c578063f10964af1461036f578063f9a7aef314610382578063fc06849d146103a957600080fd5b8063e3ae85f014610337578063e520fc7e14610340578063e7c0376d1461035357600080fd5b806391d14854146102a857806398262f79146102bb578063a0885e93146102e2578063a217fddf146102f5578063bb8493b9146102fd578063d547741f1461032457600080fd5b806336568abe1161013057806336568abe1461022857806337c01f281461023b5780634765360d14610244578063572e4f50146102575780635af720791461026057806390528e111461026957600080fd5b806301ffc9a7146101785780631d3cd2a6146101a0578063248a9ca3146101b557806324c20eec146101e65780632f2ff15d1461020d5780633644e51514610220575b600080fd5b61018b6101863660046115e7565b6103d0565b60405190151581526020015b60405180910390f35b6101b36101ae366004611548565b610407565b005b6101d86101c33660046115a0565b60009081526020819052604090206001015490565b604051908152602001610197565b6101d87f85d36e3b488c35c2a15344b305cb84e2000f26d4f3a7c1e8a516f0e82aee752a81565b6101b361021b3660046115b8565b61049a565b6101d86104c5565b6101b36102363660046115b8565b6104d4565b6101d861271081565b6101b36102523660046115a0565b610552565b6101d860025481565b6101d860035481565b6102907f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610197565b61018b6102b63660046115b8565b6105b6565b6102907f000000000000000000000000000000000000000000000000000000000000000081565b6101b36102f0366004611691565b6105df565b6101d8600081565b6102907f000000000000000000000000000000000000000000000000000000000000000081565b6101b36103323660046115b8565b610697565b6101d860075481565b600554610290906001600160a01b031681565b6101d860045481565b600654610290906001600160a01b031681565b6101b361037d36600461160f565b6106bd565b6102907f000000000000000000000000000000000000000000000000000000000000000081565b6102907f000000000000000000000000000000000000000000000000000000000000000081565b60006001600160e01b03198216637965db0b60e01b148061040157506301ffc9a760e01b6001600160e01b03198316145b92915050565b6104126000336105b6565b6104375760405162461bcd60e51b815260040161042e906117fa565b60405180910390fd5b6001600160a01b0381166104785760405162461bcd60e51b8152602060048201526008602482015267216164647265737360c01b604482015260640161042e565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b6000828152602081905260409020600101546104b68133610a43565b6104c08383610aa7565b505050565b60006104cf610b2b565b905090565b6001600160a01b03811633146105445760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161042e565b61054e8282610c1e565b5050565b61055d6000336105b6565b6105795760405162461bcd60e51b815260040161042e906117fa565b600081116105b15760405162461bcd60e51b8152602060048201526005602482015264217a65726f60d81b604482015260640161042e565b600755565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6105ea6000336105b6565b6106065760405162461bcd60e51b815260040161042e906117fa565b612710816106148486611874565b61061e9190611874565b146106545760405162461bcd60e51b815260206004820152600660248201526521736861726560d01b604482015260640161042e565b6002839055600382905560048190556040518190839085907f9a2ecc55bb71aaa59451a582a4c85358fe991317168eb337e3743fbd1185639090600090a4505050565b6000828152602081905260409020600101546106b38133610a43565b6104c08383610c1e565b6106e77f85d36e3b488c35c2a15344b305cb84e2000f26d4f3a7c1e8a516f0e82aee752a336105b6565b6107215760405162461bcd60e51b815260206004820152600b60248201526a10b0baba37b6b0ba34b7b760a91b604482015260640161042e565b6020838101519083015184516040808701519051627eeac760e11b81526001600160a01b039283166004820152602481019190915260009184169062fdd58e9060440160206040518083038186803b15801561077c57600080fd5b505afa158015610790573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b49190611679565b116107ea5760405162461bcd60e51b815260206004820152600660248201526510b7bbb732b960d11b604482015260640161042e565b83516040808601519051627eeac760e11b81526001600160a01b039283166004820152602481019190915260009183169062fdd58e9060440160206040518083038186803b15801561083b57600080fd5b505afa15801561084f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108739190611679565b116108a95760405162461bcd60e51b815260206004820152600660248201526510b7bbb732b960d11b604482015260640161042e565b6060850151511561094e577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636b20c454866000015187606001516108fd8960600151516001610c83565b6040518463ffffffff1660e01b815260040161091b93929190611787565b600060405180830381600087803b15801561093557600080fd5b505af1158015610949573d6000803e3d6000fd5b505050505b606084015151156109f3577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636b20c454856000015186606001516109a28860600151516001610c83565b6040518463ffffffff1660e01b81526004016109c093929190611787565b600060405180830381600087803b1580156109da57600080fd5b505af11580156109ee573d6000803e3d6000fd5b505050505b84516109ff9084610d28565b835185516040516001600160a01b0392831692909116907f7cce03a5f3feb688e18b4f3ba79fcc72482d15692f83a00bf983892e96b541f790600090a35050505050565b610a4d82826105b6565b61054e57610a65816001600160a01b03166014610e85565b610a70836020610e85565b604051602001610a81929190611712565b60408051601f198184030181529082905262461bcd60e51b825261042e916004016117c7565b610ab182826105b6565b61054e576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610ae73390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60007f0000000000000000000000000000000000000000000000000000000000000000461415610b7a57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b610c2882826105b6565b1561054e576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60608267ffffffffffffffff811115610cac57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610cd5578160200160208202803683370190505b50905060005b83811015610d215782828281518110610d0457634e487b7160e01b600052603260045260246000fd5b602090810291909101015280610d198161190e565b915050610cdb565b5092915050565b6000600254612710600754610d3d91906118ac565b610d47919061188c565b90506000600354612710600754610d5e91906118ac565b610d68919061188c565b90506000600354612710600754610d7f91906118ac565b610d89919061188c565b6040516331a9108f60e11b8152600481018690529091506000906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636352211e9060240160206040518083038186803b158015610def57600080fd5b505afa158015610e03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e279190611564565b9050610e33868561106e565b600654610e49906001600160a01b03168461106e565b6001600160a01b03811615610e6757610e62818361106e565b610e7d565b600554610e7d906001600160a01b03168361106e565b505050505050565b60606000610e948360026118ac565b610e9f906002611874565b67ffffffffffffffff811115610ec557634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610eef576020820181803683370190505b509050600360fc1b81600081518110610f1857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610f5557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000610f798460026118ac565b610f84906001611874565b90505b6001811115611018576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610fc657634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110610fea57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93611011816118f7565b9050610f87565b5083156110675760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161042e565b9392505050565b6040516370a0823160e01b815230600482015281907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b1580156110cf57600080fd5b505afa1580156110e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111079190611679565b101561118b576040516340c10f1960e01b81526001600160a01b038381166004830152602482018390527f000000000000000000000000000000000000000000000000000000000000000016906340c10f1990604401600060405180830381600087803b15801561117757600080fd5b505af1158015610e7d573d6000803e3d6000fd5b6040805130602482018190526001600160a01b03858116604484015260648084018690528451808503909101815260849093019093526020820180516001600160e01b03166323b872dd60e01b17905261054e927f0000000000000000000000000000000000000000000000000000000000000000169185908590611211908590611217565b50505050565b600061126c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166112e99092919063ffffffff16565b8051909150156104c0578080602001905181019061128a9190611580565b6104c05760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161042e565b60606112f88484600085611300565b949350505050565b6060824710156113615760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161042e565b843b6113af5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161042e565b600080866001600160a01b031685876040516113cb91906116f6565b60006040518083038185875af1925050503d8060008114611408576040519150601f19603f3d011682016040523d82523d6000602084013e61140d565b606091505b509150915061141d828286611428565b979650505050505050565b60608315611437575081611067565b8251156114475782518084602001fd5b8160405162461bcd60e51b815260040161042e91906117c7565b600060808284031215611472578081fd5b61147a61181a565b9050813561148781611955565b815260208281013561149881611955565b8282015260408381013590830152606083013567ffffffffffffffff808211156114c157600080fd5b818501915085601f8301126114d557600080fd5b8135818111156114e7576114e761193f565b8060051b91506114f8848301611843565b8181528481019084860184860187018a101561151357600080fd5b600095505b83861015611536578035835260019590950194918601918601611518565b50606087015250939695505050505050565b600060208284031215611559578081fd5b813561106781611955565b600060208284031215611575578081fd5b815161106781611955565b600060208284031215611591578081fd5b81518015158114611067578182fd5b6000602082840312156115b1578081fd5b5035919050565b600080604083850312156115ca578081fd5b8235915060208301356115dc81611955565b809150509250929050565b6000602082840312156115f8578081fd5b81356001600160e01b031981168114611067578182fd5b600080600060608486031215611623578081fd5b833567ffffffffffffffff8082111561163a578283fd5b61164687838801611461565b9450602086013591508082111561165b578283fd5b5061166886828701611461565b925050604084013590509250925092565b60006020828403121561168a578081fd5b5051919050565b6000806000606084860312156116a5578283fd5b505081359360208301359350604090920135919050565b6000815180845260208085019450808401835b838110156116eb578151875295820195908201906001016116cf565b509495945050505050565b600082516117088184602087016118cb565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161174a8160178501602088016118cb565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161177b8160288401602088016118cb565b01602801949350505050565b6001600160a01b03841681526060602082018190526000906117ab908301856116bc565b82810360408401526117bd81856116bc565b9695505050505050565b60208152600082518060208401526117e68160408501602087016118cb565b601f01601f19169190910160400192915050565b60208082526006908201526510b0b236b4b760d11b604082015260600190565b6040516080810167ffffffffffffffff8111828210171561183d5761183d61193f565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561186c5761186c61193f565b604052919050565b6000821982111561188757611887611929565b500190565b6000826118a757634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156118c6576118c6611929565b500290565b60005b838110156118e65781810151838201526020016118ce565b838111156112115750506000910152565b60008161190657611906611929565b506000190190565b600060001982141561192257611922611929565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461196a57600080fd5b5056fea26469706673582212209d7e49586fa1fa55e2810a32b2c50c79ce603ca270014f2c8e9e557c62baf78e64736f6c63430008040033";

type KombatGameConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KombatGameConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KombatGame__factory extends ContractFactory {
  constructor(...args: KombatGameConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _vombat: string,
    _treasure: string,
    _collectionEth: string,
    _collectionBsc: string,
    _consumables: string,
    _arena: string,
    _staking: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<KombatGame> {
    return super.deploy(
      _vombat,
      _treasure,
      _collectionEth,
      _collectionBsc,
      _consumables,
      _arena,
      _staking,
      overrides || {}
    ) as Promise<KombatGame>;
  }
  getDeployTransaction(
    _vombat: string,
    _treasure: string,
    _collectionEth: string,
    _collectionBsc: string,
    _consumables: string,
    _arena: string,
    _staking: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _vombat,
      _treasure,
      _collectionEth,
      _collectionBsc,
      _consumables,
      _arena,
      _staking,
      overrides || {}
    );
  }
  attach(address: string): KombatGame {
    return super.attach(address) as KombatGame;
  }
  connect(signer: Signer): KombatGame__factory {
    return super.connect(signer) as KombatGame__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KombatGameInterface {
    return new utils.Interface(_abi) as KombatGameInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KombatGame {
    return new Contract(address, _abi, signerOrProvider) as KombatGame;
  }
}
