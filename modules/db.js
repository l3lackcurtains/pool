const { Sequelize, DataTypes } = require("sequelize");

const { publicKeyToAddress } = require("alberti-protocol-sdk");

// Create connection to sqlite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.db",
});

// Define the Commit model
const Commit = sequelize.define(
  "Commit",
  {
    commitAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync({ force: true }); // Creates the table if it doesn't exist (and drops it if it does)
  console.log("The table for the Commit model was just (re)created!");
};

// Function to create a new Commit entry
const createCommit = async (commitAt, signature, data, publicKey, type) => {
  const address = publicKeyToAddress(publicKey);

  try {
    const commit = await Commit.create({
      commitAt,
      signature,
      address,
      data,
      publicKey,
      type,
    });
    return commit;
  } catch (error) {
    console.error("Error creating commit:", error);
    throw error;
  }
};

const getAllCommits = async () => {
  try {
    const commits = await Commit.findAll();

    return commits.sort(() => Math.random() - 0.5).slice(0, 1000);
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw error;
  }
};

const getUniqueAddresses = async () => {
  try {
    const uniqueAddresses = await Commit.aggregate("address", "DISTINCT", {
      plain: false,
    });
    return uniqueAddresses;
  } catch (error) {
    console.error("Error fetching unique addresses:", error);
    throw error;
  }
};

const countAllCommits = async () => {
  try {
    const count = await Commit.count();
    return count;
  } catch (error) {
    console.error("Error counting commits:", error);
    throw error;
  }
};

const getCommitsByAddress = async (address) => {
  try {
    const commits = await Commit.findAll({
      where: {
        address: address,
      },
    });
    return commits;
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw error;
  }
};

const getCommitsByType = async (type) => {
  try {
    const commits = await Commit.findAll({
      where: {
        type: type,
      },
    });
    return commits;
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw error;
  }
};

const getCommitBySignature = async (signature) => {
  try {
    const commit = await Commit.findOne({
      where: {
        signature: signature,
      },
    });
    return commit;
  } catch (error) {
    console.error("Error fetching commit:", error);
    throw error;
  }
};

const getHashtags = async () => {
  try {
    const commits = await Commit.findAll({
      where: {
        type: "post",
      },
    });

    const hashtags = commits.map((commit) => {
      return commit.data.hashtags;
    });

    return hashtags;
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw error;
  }
};

 const deleteOldCommits = async (days) => {
  try {
    const commits = await Commit.findAll({
      where: {
        commitAt: {
          [Op.lt]: new Date(new Date() - days * 24 * 60 * 60 * 1000),
        },
      },
    });

    commits.forEach(async (commit) => {
      await commit.destroy();
    });

    return commits;
  } catch (error) {
    console.error("Error deleting commits:", error);
    throw error;
  }
};

module.exports = {
  syncDatabase,
  sequelize,
  createCommit,
  getAllCommits,
  getUniqueAddresses,
  countAllCommits,
  getCommitsByAddress,
  getCommitsByType,
  getCommitBySignature,
  getHashtags,
  deleteOldCommits
};
