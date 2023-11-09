const app = require('./app')
const mongoose = require("mongoose");

// connect to mongodb & listen for requests
const dbURI = process.env.DB_KEY;
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then((result) => {
        app.listen(process.env.PORT || 3000, function () {
            console.log(
                "Express server listening on port %d in %s mode",
                this.address().port,
                app.settings.env
            );
        });
    })
    .catch((err) => console.log(err));