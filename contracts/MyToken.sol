// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(address(this), 100 * 10 ** decimals());
    }

    function fund(address recipient, uint256 amount) external {
        _transfer(address(this), recipient, amount);
    }
}
