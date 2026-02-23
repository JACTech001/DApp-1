const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
  let Lock;
  let lock;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();

    // Deploy contract with 1 ETH
    Lock = await ethers.getContractFactory("Lock");
    lock = await Lock.deploy({
      value: ethers.utils.parseEther("1"),
    });

    await lock.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await lock.owner()).to.equal(owner.address);
  });

  it("Should have correct initial locked amount", async function () {
    const lockedAmount = await lock.lockedAmount();
    expect(lockedAmount).to.equal(
      ethers.utils.parseEther("1")
    );
  });

  it("Should allow deposits", async function () {
    await lock.deposit({
      value: ethers.utils.parseEther("0.5"),
    });

    const lockedAmount = await lock.lockedAmount();

    expect(lockedAmount).to.equal(
      ethers.utils.parseEther("1.5")
    );
  });

  it("Should not allow non-owner to withdraw", async function () {
    await expect(
      lock.connect(addr1).withdraw(
        ethers.utils.parseEther("0.1")
      )
    ).to.be.revertedWith("Not the owner");
  });

  it("Should allow owner to withdraw", async function () {
    await lock.withdraw(
      ethers.utils.parseEther("0.2")
    );

    const lockedAmount = await lock.lockedAmount();

    expect(lockedAmount).to.equal(
      ethers.utils.parseEther("0.8")
    );
  });

  it("Should not allow withdrawing more than balance", async function () {
    await expect(
      lock.withdraw(
        ethers.utils.parseEther("2")
      )
    ).to.be.revertedWith("Insufficient balance");
  });
});
