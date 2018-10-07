pragma solidity ^0.4.11;

contract PictureContract {
    address public owner;
    mapping (address => uint) public balances;

    struct PictureItem {
        address owner;
        bool forSale;
        uint price;
    }

    PictureItem[10] public pictureItems;

    event PictureItemOwnerChanged(
        uint index
    );

    event PictureItemPriceChanged(
        uint index,
        uint price
    );

    event PictureItemAvailabilityChanged(
        uint index,
        uint price,
        bool forSale
    );

    constructor() public {
        owner = msg.sender;
        pictureItems[0].price = 10;
        pictureItems[0].forSale = true;
        pictureItems[0].owner = owner;

        pictureItems[1].price = 10;
        pictureItems[1].forSale = true;
        pictureItems[1].owner = owner;

        pictureItems[2].price = 10;
        pictureItems[2].forSale = true;
        pictureItems[2].owner = owner;

        pictureItems[3].price = 20;
        pictureItems[3].forSale = true;
        pictureItems[3].owner = owner;

        pictureItems[4].price = 20;
        pictureItems[4].forSale = true;
        pictureItems[4].owner = owner;

        pictureItems[5].price = 20;
        pictureItems[5].forSale = true;
        pictureItems[5].owner = owner;

        pictureItems[6].price = 30;
        pictureItems[6].forSale = true;
        pictureItems[6].owner = owner;

        pictureItems[7].price = 30;
        pictureItems[7].forSale = true;
        pictureItems[7].owner = owner;

        pictureItems[8].price = 40;
        pictureItems[8].forSale = true;
        pictureItems[8].owner = owner;

        pictureItems[9].price = 40;
        pictureItems[9].forSale = false;
        pictureItems[9].owner = owner;

    }

    function putPictureItemUpForSale(uint index, uint price) public {
        PictureItem storage pictureItem = pictureItems[index];

        require(msg.sender == pictureItem.owner && price > 0);

        pictureItem.forSale = true;
        pictureItem.price = price;
        emit PictureItemAvailabilityChanged(index, price, true);
    }

    function removeFromMarket(uint index) public {
        PictureItem storage pictureItem = pictureItems[index];

        require(msg.sender == pictureItem.owner);

        pictureItem.forSale = false;
        emit PictureItemAvailabilityChanged(index, pictureItem.price, false);
    }

    function getPictureItems() public view returns(address[], bool[], uint[]) {
        address[] memory addrs = new address[](10);
        bool[] memory available = new bool[](10);
        uint[] memory price = new uint[](10);

        for (uint i = 0; i < 10; i++) {
            PictureItem storage pictureItem = pictureItems[i];
            addrs[i] = pictureItem.owner;
            price[i] = pictureItem.price;
            available[i] = pictureItem.forSale;
        }

        return (addrs, available, price);
    }

    function getPictureItem(uint index) public view returns(address, bool, uint) {
        PictureItem storage pictureItem = pictureItems[index];
        address addrs = pictureItem.owner;
        uint price = pictureItem.price;
        bool available = pictureItem.forSale;
        return (addrs, available, price);
    }

    function buyPictureItem(uint index) public payable {
        PictureItem storage pictureItem = pictureItems[index];

        require(msg.sender != pictureItem.owner && pictureItem.forSale && msg.value >= pictureItem.price);

        if(pictureItem.owner == 0x0) {
            balances[owner] += msg.value;
        }else {
            balances[pictureItem.owner] += msg.value;
        }

        pictureItem.owner = msg.sender;
        pictureItem.forSale = false;

        emit PictureItemOwnerChanged(index);
    }

    function withdrawFunds() public {
        address payee = msg.sender;
        uint payment = balances[payee];
        require(payment > 0);
        balances[payee] = 0;
        require(payee.send(payment));
    }

    function destroy() payable public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}
