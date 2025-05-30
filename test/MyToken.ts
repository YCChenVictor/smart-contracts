import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MyToken } from '../typechain-types';

describe('MyToken', function () {
    let MyToken, myToken: MyToken;

    beforeEach(async function () {
        const [deployer] = await ethers.getSigners();
        MyToken = await ethers.getContractFactory('MyToken');
        myToken = (await MyToken.deploy('MyToken', 'MTK', deployer.address)) as MyToken;
    });

    it('Should assign the total supply to the contract', async function () {
        const contractAddress = await myToken.getAddress();
        const contractBalance = await myToken.balanceOf(contractAddress);
        expect(await myToken.totalSupply()).to.equal(contractBalance);
    });
});
