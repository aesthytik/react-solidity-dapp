async function main() {
    const [owner, randoPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});
    await waveContract.deployed();

   let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log("contractBalance:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave("hello");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("contractBalance:", hre.ethers.utils.formatEther(contractBalance));

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randoPerson).wave("hello again");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    let allWaves = await waveContract.getAllWaves();
    console.log("All waves:", allWaves);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
})