// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuizPlatform {
    address public owner;
    uint256 public rewardPerQuiz = 0.5 ether; // Reward for completing a quiz
    uint256 public minWithdrawal = 15 ether; // Minimum withdrawal amount

    struct User {
        uint256 balance;
        bool hasPlayedToday;
    }

    mapping(address => User) public users;

    event QuizCompleted(address indexed user, uint256 reward);
    event FundsWithdrawn(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Function to report quiz results
    function reportResults(uint8 correctAnswers) public {
        require(
            !users[msg.sender].hasPlayedToday,
            "You have already played today"
        );
        require(
            correctAnswers == 20,
            "You must answer all questions correctly to earn rewards"
        );

        users[msg.sender].balance += rewardPerQuiz;
        users[msg.sender].hasPlayedToday = true;

        emit QuizCompleted(msg.sender, rewardPerQuiz);
    }

    // Reset daily quiz participation (owner-only)
    function resetDailyParticipation(address user) public {
        require(msg.sender == owner, "Only the owner can reset participation");
        users[user].hasPlayedToday = false;
    }

    // Function to withdraw rewards
    function withdraw() public {
        require(
            users[msg.sender].balance >= minWithdrawal,
            "Insufficient funds to withdraw"
        );

        uint256 amount = users[msg.sender].balance;
        users[msg.sender].balance = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit FundsWithdrawn(msg.sender, amount);
    }

    // Function to deposit Ether for rewards (owner only)
    function depositFunds() public payable {
        require(msg.sender == owner, "Only the owner can deposit funds");
    }

    // Fallback function to receive Ether
    receive() external payable {}
}
