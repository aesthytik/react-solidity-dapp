async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // contarct key =  0x3F8A556D5BDe9477D9913DEEfF3B68373b58ED36

    console.log('Deploying contract...', deployer.address);
    console.log('Account balance', (await deployer.getBalance()).toString());
    const Token = await hre.ethers.getContractFactory("WavePortal");
    const token = await Token.deploy();

    console.log("Contract deployed to:", token.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
})