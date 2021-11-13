
const main = async() => {
    const songContractFactory = await hre.ethers.getContractFactory('SongPortal');
    const songContract = await songContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await songContract.deployed();
    console.log('Contract addy:', songContract.address);
    //console.log("Contract deployed to:", songContract.address);
    //console.log("Contract deployed by:", owner.address);


    let contractBalance = await hre.ethers.provider.getBalance(
        songContract.address
    );
    console.log(
        'Contract Balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );
    let songCount;
    songCount = await songContract.getTotalSongs();
    console.log(songCount.toNumber());

    // send some test Songs
    const songTxn = await songContract.song('Only the wild ones', 'Dispatch', 'https://www.youtube.com/watch?v=OVi0JpvMZtk');
    await songTxn.wait();   // wait for transaction to be mined

    const songTxn2 = await songContract.song('Only the wild ones', 'Dispatch', 'https://www.youtube.com/watch?v=OVi0JpvMZtk');
    await songTxn2.wait();   // wait for transaction to be mined

    contractBalance = await hre.ethers.provider.getBalance(songContract.address);
    console.log(
        'Contract Balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );
    // const [_, randomPerson] = await hre.ethers.getSigners()
    // songTxn = await songContract.connect(randomPerson).song('Sense','King Gizzard and the Lizard Wizard','https://www.youtube.com/watch?v=RobhSr2bozU');
    // await songTxn.wait();

    let allSongs = await songContract.getAllSongs();
    console.log(allSongs);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();