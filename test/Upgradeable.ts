import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("MyToken Upgrade", function () {
  let proxyAddress: string;
  let tokenAddress: string;

  before(async function () {
    const initialSupply = 1000n * 10n ** 18n;

    const MockToken = await ethers.getContractFactory("MyToken");
    const mockToken = await MockToken.deploy();
    await mockToken.waitForDeployment();
    tokenAddress = await mockToken.getAddress();

    const Upgradeable1 = await ethers.getContractFactory("Upgradeable1");
    const proxy = await upgrades.deployProxy(
      Upgradeable1,
      ["MyToken", "MTK", initialSupply, tokenAddress],
      { initializer: "initialize" },
    );

    proxyAddress = await proxy.getAddress();
  });

  it("upgrades to V2", async function () {
    const Upgradeable2 = await ethers.getContractFactory("Upgradeable2");
    const upgraded = await upgrades.upgradeProxy(proxyAddress, Upgradeable2);
    expect(await upgraded.getAddress()).to.equal(proxyAddress);
  });
});
