// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Upgradeable1 is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    error AlreadyJoined();
    IERC20 public token;
    mapping(address => bool) public hasJoined;
    event Initialized(string name, string symbol, uint256 initialSupply);
    event AlreadyTriedJoin(address user);

    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address tokenAddress
    ) public initializer {
        __ERC20_init(name, symbol);
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        token = IERC20(tokenAddress);
        _mint(msg.sender, initialSupply);
        emit Initialized(name, symbol, initialSupply);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function join() external {
        if (hasJoined[msg.sender]) {
            emit AlreadyTriedJoin(msg.sender);
            revert AlreadyJoined();
        }
    
        hasJoined[msg.sender] = true;
        token.transfer(msg.sender, 1 ether);
    }
}
