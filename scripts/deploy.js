/*const main = async() =>{
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());

    const Token = await hre.ethers.getContractFactory('SongPortal');
    const portal = await Token.deploy();
    await portal.deployed();

    console.log('SongPortal address: ', portal.address);
};*/

const main = async () => {
    const songContractFactory = await hre.ethers.getContractFactory('SongPortal');
    const songContract = await songContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.001'),
    });
  
    await songContract.deployed();
  
    console.log('SongPortal address: ', songContract.address);
  };

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error){
        console.error(error);
        process.exit(1);
    }
};

runMain();