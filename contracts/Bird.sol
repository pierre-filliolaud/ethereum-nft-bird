pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Bird is ERC721 {
    string[] public birds;
    mapping(bytes32 => bool) _birdsExists;
    mapping(bytes32 => uint256) _birdsIndex;

    constructor() ERC721("Bird", "BIRD") public {
    }

    // E.G. from https://www.peppercarrot.com/extras/html/2019_bird-generator/?seed=
    // example Bird: 61390a126d04b
    // linked to https://www.peppercarrot.com/extras/html/2019_bird-generator/avatar.php?seed=61390a126d04b
    function mint(string memory _bird) public {
        require(!_birdsExists[keccak256(bytes (_bird))]);
        birds.push(_bird);
        uint256 _id = birds.length - 1;
        _mint(msg.sender, _id);
        _birdsExists[keccak256(bytes (_bird))] = true;
        _birdsIndex[keccak256(bytes (_bird))] = _id;
    }

    function transfer(address from, address to, string memory _bird) public {
        require(_birdsExists[keccak256(bytes (_bird))]);
        uint256 id = _birdsIndex[keccak256(bytes (_bird))];
        transferFrom(from, to, id);
    }

}