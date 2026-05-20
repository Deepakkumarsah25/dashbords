const express = require("express");

const cookieParser =
    require("cookie-parser");

const cors =
    require("cors");

const helmet =
    require("helmet");

const passport =
    require("passport");

module.exports = function (app) {

    // ✅ SECURITY
    app.use(

        helmet({

            contentSecurityPolicy:
                false

        })

    );

    // ✅ CORS
    app.use(cors());

    // ✅ JSON
    app.use(

        express.json({

            limit: "50mb"

        })

    );

    // ✅ FORM URL ENCODED
    app.use(

        express.urlencoded({

            extended: true,

            limit: "50mb"

        })

    );

    // ✅ COOKIE
    app.use(

        cookieParser()

    );

    // ✅ STATIC FOLDER
    app.use(

        express.static("public")

    );

    // ✅ PASSPORT
    app.use(

        passport.initialize()

    );

    app.use(

        passport.session()

    );

    // ✅ PASSPORT CONFIG
    require("../config/passport")(passport);

};