const mongoose = require("mongoose");

module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(
            "mongodb+srv://dev:OjGhKZbDWwmKtm5f@cluster0.m5gh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
            }
        );
    },
    disconnect: async () => {
        await mongoose.disconnect();
    },
};
