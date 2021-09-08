pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Bird is ERC721 {
    string[] public birds;
    mapping(string => bool) _birdsExists;

    constructor() ERC721("Bird", "BIRD") public {
    }

    // E.G. from https://www.peppercarrot.com/extras/html/2019_bird-generator/?seed=
    // example Bird: 61390a126d04b
    // linked to https://www.peppercarrot.com/extras/html/2019_bird-generator/avatar.php?seed=61390a126d04b
    function mint(string memory _bird) public {
        require(!_birdsExists[_bird]);
        birds.push(_bird);
        uint _id = birds.length - 1;
        _mint(msg.sender, _id);
        _birdsExists[_bird] = true;
    }

}