import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployQuadraticVoting: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const easAddresses: { [key: string]: string } = {
    sepolia: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    //add other networks
  };
  const VOTING_SCHEMA_UID = "0x4dd00e683543520f2efe3ec546ae6f8e306e37460d4142000f23d7e8b75d68ee"; // Replace with actual schema UID

  try {
    // Check if the current network is supported
    if (!easAddresses[hre.network.name]) {
      throw new Error(`Unsupported network: ${hre.network.name}`);
    }

    const quadraticVoting = await deploy("QuadraticVoting", {
      from: deployer,
      // Contract constructor arguments
      args: [easAddresses[hre.network.name], VOTING_SCHEMA_UID],
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      autoMine: true,
    });
    console.log("QuadraticVoting deployed to:", quadraticVoting.address);
    // Get the deployed contract instance
    // const quadraticVotingContract = await hre.ethers.getContractAt("QuadraticVoting", quadraticVoting.address);

    // const yourAddress = "0xFFF17C3C139Cb65028aFE4D192A7E630e9F5C99e"
    // await quadraticVotingContract.transferOwnership(yourAddress);
    // console.log(`Ownership transferred to: ${yourAddress}`);
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
};
export default deployQuadraticVoting;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployQuadraticVoting.tags = ["QuadraticVoting"];
