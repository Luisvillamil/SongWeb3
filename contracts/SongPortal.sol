// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SongPortal {
    uint256 totalSongs;
    /*
    * Using this below to generate a random number
    */
    uint256 private seed;
    /*
     * basically a trigger
     */
    event NewSong(address indexed from, uint256 timestamp, string title, string artist, string message);

    struct Song {
        address friend; // address of user who sent me a song :)
        string title;
        string artist;
        string message; // message the user sent.
        uint256 timestamp; // the timestamp when the user sent the song.
    }

    Song[] songs;
    
    mapping(address=> uint256) public lastWavedAt;
    constructor() payable{
        console.log("Send me songs to listen to!");

        /*
        Set initial seed
        */
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function song(string memory _title, string memory _artist, string memory _message) public{
        
        require(
            lastWavedAt[msg.sender] + 15 seconds < block.timestamp,
            "wait 30 seconds before waving again."
        );

        lastWavedAt[msg.sender] = block.timestamp;

        totalSongs += 1;
        console.log('%s wants you to listen to this!', msg.sender);

        /*
        This is where I store the song data in the array
         */
        songs.push(Song(msg.sender, _title, _artist, _message, block.timestamp));

        seed = (block.timestamp + block.difficulty) % 100;
        console.log("random number generated: ", seed);
        if (seed <= 50) {
            console.log("%s Won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }


        emit NewSong(msg.sender, block.timestamp, _title, _artist, _message);
    }

    function getAllSongs() public view returns(Song[] memory) {
        return songs;
    }

    function getTotalSongs() public view returns (uint256) {
        console.log('We have %d total songs!', totalSongs);
        return totalSongs;
    }
}