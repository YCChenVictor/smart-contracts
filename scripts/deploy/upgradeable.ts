import { ethers, upgrades } from "hardhat";

async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("MyToken deployed to:", tokenAddress);

  const Upgradeable1 = await ethers.getContractFactory("Upgradeable1");
  const initialSupply = ethers.parseEther("1000");
  const proxy = await upgrades.deployProxy(
    Upgradeable1,
    ["MyToken", "MTK", initialSupply, tokenAddress],
    {
      initializer: "initialize",
      kind: "uups",
    },
  );

  await proxy.waitForDeployment();
  console.log("Upgradeable1 proxy deployed to:", await proxy.getAddress());

  const proxyAddress = await proxy.getAddress();
  await token.fund(proxyAddress, ethers.parseEther("10"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
