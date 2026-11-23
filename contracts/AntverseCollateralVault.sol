// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice EXPERIMENTAL custody-only example. NOT a lending protocol.
/// @dev Do NOT deploy with real funds. Missing production-level security controls.
interface IAntvToken {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}
contract AntverseCollateralVault {
    IAntvToken public immutable token;
    address public immutable admin;
    bool public withdrawalsEnabled;
    mapping(address => uint256) public balances;
    uint256 public totalDeposited;
    event Deposited(address indexed account, uint256 amount);
    event Withdrawn(address indexed account, uint256 amount);
    constructor(address token_) {
        require(token_ != address(0), "zero token");
        token = IAntvToken(token_);
        admin = msg.sender;
    }
    function deposit(uint256 amount) external {
        require(amount != 0, "zero amount");
        balances[msg.sender] += amount;
        totalDeposited += amount;
        require(token.transferFrom(msg.sender, address(this), amount), "transfer failed");
        emit Deposited(msg.sender, amount);
    }
    function withdraw(uint256 amount) external {
        require(withdrawalsEnabled, "disabled");
        require(amount != 0 && balances[msg.sender] >= amount, "invalid amount");
        balances[msg.sender] -= amount;
        totalDeposited -= amount;
        require(token.transfer(msg.sender, amount), "transfer failed");
        emit Withdrawn(msg.sender, amount);
    }
    function setWithdrawalsEnabled(bool enabled) external {
        require(msg.sender == admin, "not admin");
        withdrawalsEnabled = enabled;
    }
}
