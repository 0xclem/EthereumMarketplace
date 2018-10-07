export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'forSale',
        type: 'bool',
      },
    ],
    name: 'PictureItemAvailabilityChanged',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'buyPictureItem',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'destroy',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256',
      },
      {
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'putPictureItemUpForSale',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'removeFromMarket',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'PictureItemPriceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'PictureItemOwnerChanged',
    type: 'event',
  },
  {
    constant: false,
    inputs: [],
    name: 'withdrawFunds',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'balances',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getPictureItem',
    outputs: [
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'bool',
      },
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getPictureItems',
    outputs: [
      {
        name: '',
        type: 'address[]',
      },
      {
        name: '',
        type: 'bool[]',
      },
      {
        name: '',
        type: 'uint256[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'pictureItems',
    outputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'forSale',
        type: 'bool',
      },
      {
        name: 'price',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
