var express = require("express");

var app = express();
var bodyParser = require("body-parser");
const Razorpay = require("razorpay");
var nodemailer = require("nodemailer");
const transporter1 = require("./public/javascript/Transporter");
//password complexity
const { passwordStrength } = require("check-password-strength");
const { defaultOptions } = require("./index");
//encrypt password
const bcrypt = require("bcrypt");
//json web token
//const jwt = require("jsonwebtoken");
//public folder frontend
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//encrypt hex of rajorpay
const crypto = require("crypto");

//file upload
const fileUpload = require("express-fileupload");
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "tmp"),
        createParentPath: true,
        limits: { fileSize: 2 * 1024 * 1024 },
    })
);

app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: "rzp_test_YALeH69IqswJJf",
    key_secret: "FHO20UN841BH5w2OCTqpRD40",
});

const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

//models
const sql = require("./database.js");
const { json } = require("body-parser");
const sqlCon = sql.sqlConnector();
const {
    requireAuth,
    checkCurrentUser,
} = require("./middleware/authMiddleware");

//call status changer to mark out defaulters on server startup
setInterval(function() {
    planStatus();
}, 3000);

//renew subscription
setInterval(function() {
    addRenewAll();
}, 3000);

//expired coupon
setInterval(function() {
    expireCoupon();
}, 5000);
//global variables
let user;
let gallery = [];

//plans of subscription
let subscriptionPlans = {
    isCouponApllied: false,
    isEdited: false,
    Starter: {
        price: 210000,
        validity: 365,
        noOfListing: 1,
    },
    Professional: {
        price: 310000,
        validity: 365,
        noOfListing: 2,
    },
    Business: {
        price: 410000,
        validity: 365,
        noOfListing: 3,
    },
};
//temporary plan subscription if coupon is applied
let tempSubscriptionPlans = {
    coupon: "",
    Starter: {
        price: 210000,
        validity: 365,
        noOfListing: 1,
    },
    Professional: {
        price: 310000,
        validity: 365,
        noOfListing: 2,
    },
    Business: {
        price: 410000,
        validity: 365,
        noOfListing: 3,
    },
};

app.get("/signUp", (req, res) => {
    res.render("signUp");
});

app.post("/signUp", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let mobileNumber = req.body.mobileNumber;
    let name = req.body.name;
    let companyName = req.body.companyName;

    console.log(
        " " +
        email +
        " " +
        password +
        " " +
        mobileNumber +
        " " +
        name +
        " " +
        companyName
    );

    let query =
        "INSERT INTO users (email, password, name, mobileNumber, companyName) VALUES (?,?,?,?,?)";
    sqlCon.query(
        query, [email, password, name, mobileNumber, companyName],
        (err, result) => {
            if (err) throw err;

            console.log("new user signedUp " + result);
        }
    );
});

app.post("/signIn", async(req, res) => {
    email = req.body.email;
    password = req.body.password;
    const token = await createToken(email);

    console.log(email + " wants to login with " + password);
    let query = "SELECT email, password ,plan,access FROM users WHERE email =?";
    sqlCon.query(query, [email], (err, result) => {
        if (err) throw err;
        console.log("length of result " + result.length);
        if (result.length > 0) {
            console.log("matching email with password" + result);

            // checking password
            console.log(
                "checking if " + password + " is equal to " + result[0].password
            );
            //checking encrypt password
            const isCorrectPassword = bcrypt.compareSync(
                password,
                result[0].password
            );
            if (isCorrectPassword) {
                console.log("sign in successfull");
                //check subscription date
                console.log("plan of the user " + result[0].plan);
                if (result[0].access === "removed") {
                    res.status(400).json({ error: { email: "access denied by admin" } });
                } else if (result[0].plan === "expired") {
                    res.status(201).json({ user: email, plan: "expired" });
                    console.log(
                        "please subscribe again your monthly subscription is over"
                    );
                } else if (result[0].plan !== "expired") {
                    console.log("welcome " + email);
                    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
                    res.status(201).json({ user: email });
                }
            } else {
                console.log("wrong password");
                res.status(400).json({
                    error: {
                        password: "wrong password",
                    },
                });
            }
        } else {
            console.log("no such email registerd");
            res.status(400).json({
                error: {
                    email: "no such email registerd",
                },
            });
        }
    });
});

//payment
app.post("/order/:plan", (req, res) => {
    console.log("inside order making");
    let amount1 = 0;
    if (
        subscriptionPlans.isCouponApllied === true &&
        subscriptionPlans.isEdited === true
    ) {
        console.log("order after coupon is applied");
        if (req.params.plan == "Starter") {
            amount1 = tempSubscriptionPlans.Starter.price;
        } else if (req.params.plan == "Professional") {
            amount1 = tempSubscriptionPlans.Professional.price;
        } else if (req.params.plan == "Business") {
            amount1 = tempSubscriptionPlans.Business.price;
        } //else if (req.params.plan == "Enterprise") {
        //   amount1 = tempSubscriptionPlans.Enterprise.price;
        // }
    } else {
        if (req.params.plan == "Starter") {
            amount1 = subscriptionPlans.Starter.price;
        } else if (req.params.plan == "Professional") {
            amount1 = subscriptionPlans.Professional.price;
        } else if (req.params.plan == "Business") {
            amount1 = subscriptionPlans.Business.price;
        }
        //  else if (req.params.plan == "Enterprise") {
        //   amount1 = subscriptionPlans.Enterprise.price;
        // }
    }

    let options = {
        amount: amount1,
        currency: "INR",
        receipt: "order_rcptid_11",
    };

    if (amount1 !== 0) {
        razorpay.orders.create(options, (err, order) => {
            console.log(order);
            res.json(order);
        });
    }
});

//check the authenticity of order and if the order was successful
// app.post("/is-order-complete/", checkCurrentUser, async (req, res) => {
//   console.log("walaah user ", req.user);
//   let user = req.user;
//   console.log("inside payment authentication");
//   const secret = "12345678";
//   console.log(req.body);

//   const shasum = crypto.createHmac("sha256", secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   console.log(
//     "header and body hex" + digest,
//     req.headers["x-razorpay-signature"]
//   );

//   if (digest === req.headers["x-razorpay-signature"]) {
//     console.log("request is legit for user " + user.email);
//     const token = await createToken(user.email);
//     console.log("token ", token);
//     res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });

//     // identify the plan buyed by the user
//     let plan;

//     //if coupon was applied or not
//     if (
//       subscriptionPlans.isCouponApllied === true &&
//       subscriptionPlans.isEdited === true
//     ) {
//       console.log(
//         "will compare ",
//         req.body.payload.payment.entity.amount,
//         tempSubscriptionPlans
//       );

//       if (
//         req.body.payload.payment.entity.amount ===
//         tempSubscriptionPlans.Starter.price
//       ) {
//         plan = "Starter";
//       } else if (
//         req.body.payload.payment.entity.amount ===
//         tempSubscriptionPlans.Business.price
//       ) {
//         plan = "Business";
//       } else if (
//         req.body.payload.payment.entity.amount ===
//         tempSubscriptionPlans.Professional.price
//       ) {
//         plan = "Professional";
//       } else if (
//         req.body.payload.payment.entity.amount ===
//         tempSubscriptionPlans.Enterprise.price
//       ) {
//         plan = "Enterprise";
//       }

//       //as this payment was done by coupon saving this information to db so that user doesnt apply coupon again
//       let sql =
//         "INSERT INTO `appliedcoupon` (`id`, `coupon`, `email`) VALUES (NULL, ? ,?) ";
//       sqlCon.query(
//         sql,
//         [tempSubscriptionPlans.coupon, user.email],
//         (err, result) => {
//           if (err) throw err;
//           console.log("coupon applied inserted in database");
//         }
//       );
//       //as the coupon is applied subtract number of users from the coupon table
//       subtractUser(tempSubscriptionPlans.coupon);
//     } else {
//       if (
//         req.body.payload.payment.entity.amount ===
//         subscriptionPlans.Starter.price
//       ) {
//         plan = "Starter";
//       } else if (
//         req.body.payload.payment.entity.amount ===
//         subscriptionPlans.Business.price
//       ) {
//         plan = "Business";
//       } else if (
//         req.body.payload.payment.entity.amount ===
//         subscriptionPlans.Professional.price
//       ) {
//         plan = "Professional";
//       } else if (
//         req.body.payload.payment.entity.amount ===
//         subscriptionPlans.Enterprise.price
//       ) {
//         plan = "Enterprise";
//       }
//     }

//     console.log(
//       "this payment info will be saved inside database ",
//       req.body.payload.payment.entity
//     );
//     console.log("payment id: ", req.body.payload.payment.entity.id);
//     console.log("order id: ", req.body.payload.payment.entity.order_id);
//     console.log("payment method: ", req.body.payload.payment.entity.method);
//     console.log(
//       "email used for payment: ",
//       req.body.payload.payment.entity.email
//     );
//     console.log(
//       "contact used for payment: ",
//       req.body.payload.payment.entity.contact
//     );

//     let sql =
//       "INSERT INTO payment_information (email,transactionId,orderId,phoneNumber,method,amount) VALUES (?,?,?,?,?,?)";
//     sqlCon.query(
//       sql,
//       [
//         req.body.payload.payment.entity.email,
//         req.body.payload.payment.entity.id,
//         req.body.payload.payment.entity.order_id,
//         req.body.payload.payment.entity.contact,
//         req.body.payload.payment.entity.method,
//         req.body.payload.payment.entity.amount,
//       ],
//       (err, result) => {
//         if (err) throw err;
//         console.log(
//           req.body.payload.payment.entity.id +
//             " transaction id inserted in payment table"
//         );
//         subscriptionPlans.isCouponApllied = false;
//         subscriptionPlans.isEdited = false;
//       }
//     );
//     try {
//       if (Object.keys(user).length > 1) {
//         console.log("new signUp");
//         try {
//           user = Object.assign(user, { plan: plan });

//           // res.cookie("jwt", token, { maxAge: maxAge * 1000 });
//           saveUser(user);
//         } catch (error) {
//           console.log(error);
//         }

//         // res.status(201).json({ user: user.email, token });
//       } else if (Object.keys(user).length === 1) {
//         console.log("inside renew subscription almost done payment done");
//         renewSubscription(plan);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // const token = await createToken(user.email);
//   // console.log("token ", token);
//   // res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
//   //res.redirect("/homeAfterLogin/" + user.email);
//   res.sendStatus(201).json("ok");
// });

app.post("/is-order-complete/", async(req, res) => {
    console.log("inside payment authentication");
    const secret = "12345678";
    console.log(req.body);

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(
        "header and body hex" + digest,
        req.headers["x-razorpay-signature"]
    );

    if (digest === req.headers["x-razorpay-signature"]) {
        const token = await createToken(user.email);
        console.log("token ", token);
        res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
        console.log("request is legit for user " + user.email);

        // identify the plan buyed by the user
        let plan;

        //if coupon was applied or not
        if (
            subscriptionPlans.isCouponApllied === true &&
            subscriptionPlans.isEdited === true
        ) {
            console.log(
                "will compare ",
                req.body.payload.payment.entity.amount,
                tempSubscriptionPlans
            );

            if (
                req.body.payload.payment.entity.amount ===
                tempSubscriptionPlans.Starter.price
            ) {
                plan = "Starter";
            } else if (
                req.body.payload.payment.entity.amount ===
                tempSubscriptionPlans.Business.price
            ) {
                plan = "Business";
            } else if (
                req.body.payload.payment.entity.amount ===
                tempSubscriptionPlans.Professional.price
            ) {
                plan = "Professional";
            } else if (
                req.body.payload.payment.entity.amount ===
                tempSubscriptionPlans.Enterprise.price
            ) {
                plan = "Enterprise";
            }

            //as this payment was done by coupon saving this information to db so that user doesnt apply coupon again
            let sql =
                "INSERT INTO `appliedcoupon` (`id`, `coupon`, `email`) VALUES (NULL, ? ,?) ";
            sqlCon.query(
                sql, [tempSubscriptionPlans.coupon, user.email],
                (err, result) => {
                    if (err) console.log(err);
                    console.log("coupon applied inserted in database");
                }
            );
            //as the coupon is applied subtract number of users from the coupon table
            subtractUser(tempSubscriptionPlans.coupon);
        } else {
            if (
                req.body.payload.payment.entity.amount ===
                subscriptionPlans.Starter.price
            ) {
                plan = "Starter";
            } else if (
                req.body.payload.payment.entity.amount ===
                subscriptionPlans.Business.price
            ) {
                plan = "Business";
            } else if (
                req.body.payload.payment.entity.amount ===
                subscriptionPlans.Professional.price
            ) {
                plan = "Professional";
            } //else if (
            //   req.body.payload.payment.entity.amount ===
            //   subscriptionPlans.Enterprise.price
            // ) {
            //   plan = "Enterprise";
            // }
        }

        console.log(
            "this payment info will be saved inside database ",
            req.body.payload.payment.entity
        );
        console.log("payment id: ", req.body.payload.payment.entity.id);
        console.log("order id: ", req.body.payload.payment.entity.order_id);
        console.log("payment method: ", req.body.payload.payment.entity.method);
        console.log(
            "email used for payment: ",
            req.body.payload.payment.entity.email
        );
        console.log(
            "contact used for payment: ",
            req.body.payload.payment.entity.contact
        );

        let sql =
            "INSERT INTO payment_information (email,transactionId,orderId,phoneNumber,method,amount) VALUES (?,?,?,?,?,?)";
        sqlCon.query(
            sql, [
                req.body.payload.payment.entity.email,
                req.body.payload.payment.entity.id,
                req.body.payload.payment.entity.order_id,
                req.body.payload.payment.entity.contact,
                req.body.payload.payment.entity.method,
                req.body.payload.payment.entity.amount,
            ],
            (err, result) => {
                if (err) throw err;
                console.log(
                    req.body.payload.payment.entity.id +
                    " transaction id inserted in payment table"
                );
                subscriptionPlans.isCouponApllied = false;
                subscriptionPlans.isEdited = false;
            }
        );
        try {
            if (Object.keys(user).length > 1) {
                console.log("new signUp");
                try {
                    user = Object.assign(user, { plan: plan });

                    // res.cookie("jwt", token, { maxAge: maxAge * 1000 });
                    saveUser(user);
                } catch (error) {
                    console.log(error);
                }

                // res.status(201).json({ user: user.email, token });
            } else if (Object.keys(user).length === 1) {
                console.log("inside renew subscription almost done payment done");
                renewSubscription(plan);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // const token = await createToken(user.email);
    // console.log("token ", token);
    // res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.locals.user = user;
    res.redirect("/homeAfterLogin/" + user.email);
});

//save user from signup page
app.post("/saveUser", async(req, res) => {
    //check if user is already registerd
    let sql =
        "SELECT email, mobileNumber  FROM users WHERE email = ? OR mobileNumber = ?";
    sqlCon.query(
        sql, [req.body.email, req.body.mobileNumber],
        async(err, result) => {
            if (err) throw err;
            console.log(result);

            if (result.length === 0) {
                // check password strength
                let passStrength = passwordStrength(req.body.password, defaultOptions);
                console.log("password strength ", passStrength.value);
                if (passStrength.value === "Too weak") {
                    console.log("paswword weak cought");
                    res
                        .status(400)
                        .json({ error: { password: "password must contain any special char. & num" } });
                }

                //encrypting the password
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);
                console.log("-------------user-");
                user = req.body;

                if (Object.keys(user).length > 1) {
                    if (req.body.password !== req.body.confirmPassword) {
                        console.log("password doesnt match");
                        res
                            .status(400)
                            .json({ error: { password: "password doesnt match" } });
                    } else {
                        console.log("users object length " + Object.keys(user).length);
                        user.password = hashed;

                        //create url token
                        const urlToken = await createTokenForUrl(user);

                        //send new signUp a reminder via mail

                        var mailOptions = {
                            from: "sameer.vashisth.egs@gmail.com",
                            to: req.body.email,
                            subject: "Welcome To Brahman Chamber Of Commerce",
                            text: "Please follow the link given bellow",
                            html: `<h1>Please click the link given bellow in your browser</h1><br>
          <a href = 'http://localhost:3000/plans/${req.body.email}/${urlToken}'>Link</a>`,
                        };
                        mailUser(mailOptions);
                        console.log(user);
                        res.status(201).json({ email: user.email, plan: true });
                    }
                } else if (Object.keys(user).length === 1) {
                    console.log("user with only email", user);
                }
            } else if (result.length !== 0) {
                //check if mobile number already used
                console.log(
                    "comparing ",
                    result[0].mobileNumber,
                    req.body.mobileNumber
                );
                if (
                    result[0].mobileNumber == req.body.mobileNumber &&
                    result[0].email == req.body.email
                ) {
                    res.status(400).json({
                        error: {
                            mobileNumber: "mobile number already used",
                            email: "user has been already registerd",
                        },
                    });
                } else if (result[0].mobileNumber == req.body.mobileNumber) {
                    res
                        .status(400)
                        .json({ error: { mobileNumber: "mobile number already used" } });
                } else if (result[0].email == req.body.email) {
                    console.log("user has been already registerd");
                    res
                        .status(400)
                        .json({ error: { email: "user has been already registerd" } });
                }
            }
        }
    );
});

//renew the subscription
app.get("/renewSubscription/:email", requireAuth, (req, res) => {
    //setting the coupon object to default to remove the settings
    subscriptionPlans.isEdited = false;
    subscriptionPlans.isCouponApllied = false;

    console.log("inside renew subscription of " + req.params.email);
    user = { email: req.params.email };
    res.render("renewSubscription", { email: req.params.email });
});

//homepage without login
app.get("/home", (req, res) => {
    res.render("index");
});
app.get("/blog/", (req, res) => {
    res.render("blog");
});
app.get("/blogsingle/", (req, res) => {
    res.render("blog-single");
});
app.get("/blogBCC/", (req, res) => {
    res.render("BCC");
});
app.get("/blogListings/", (req, res) => {
    res.render("Listings");
});
app.get("/page-pricing", (req, res) => {
    res.render("page-pricing");
});
app.get("/listingfull", (req, res) => {
    res.render("listing-full");
});
app.get("/page-profile/:email", requireAuth, (req, res) => {
    res.render("page-profile", { email: req.params.email });
});
app.get("/page-user/:email", requireAuth, (req, res) => {
    res.render("page-user", { email: req.params.email });
});
//add listing
app.get("/addListingPage/:email", requireAuth, (req, res) => {
    res.render("page-addListing", { email: req.params.email });
});

// //test post req
// app.post("/work", (req, res) => {
//   console.log("inside test ", req.body);
//   let formData = req.body.x;
//   // for (let data of formData) {
//   //   console.log(data);
//   // }
// });

app.post("/addListing/:email", requireAuth, (req, res) => {
    let sql = "SELECT plan FROM users WHERE email = ?";
    sqlCon.query(sql, [req.params.email], (err, result) => {
        if (err) throw err;
        console.log(subscriptionPlans[result[0].plan].noOfListing);
        let defaultCount = subscriptionPlans[result[0].plan].noOfListing;
        // res.send(subscriptionPlans[result[0].plan].noOfListing.toString());
        let sql = "SELECT COUNT(*) AS count FROM `add_listing` WHERE email = ? ";
        sqlCon.query(sql, [req.params.email], (err, result) => {
            if (err) throw err;
            console.log(
                "number of addlisting done by ",
                req.params.email,
                result[0].count
            );
            let chancesLeft = defaultCount - result[0].count;
            console.log(chancesLeft);

            if (defaultCount >= result[0].count) {
                var body = req.body;

                var sql =
                    "INSERT INTO `add_listing`(`email`,`businessName`,`address`,`zipCode`,`description`,`category`,`sub-catagory`,`sub-sub-catagory`,`mobilenumber`,`businessEmail`,`website`  ) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                sqlCon.query(
                    sql, [
                        req.params.email,
                        body.businessName,
                        body.address,
                        body.zipCode,
                        body.description,
                        body.category,
                        body.subCatagory,
                        body.subSubCatagory,
                        body.mobilenumber,
                        body.businessEmail,
                        body.website,
                    ],
                    function(err, result) {
                        if (err) throw err;
                        galleryDao(result.insertId);
                        console.log(
                            "add listing added without image at id " + result.insertId
                        );
                    }
                );
            } else {
                console.log(
                    "log no more chances of add listing for ",
                    req.params.email
                );
            }
        });
    });
});

//uploading images from addlisting
app.post("/file-upload", async(req, res, next) => {
    console.log("indside uploading files");
    try {
        console.log(req.files.file);
        const file = req.files.file;

        // const promises = files.map((file) => {
        //   const savePath = path.join(
        //     __dirname,
        //     "public",
        //     "images",
        //     "uploaded_images",
        //     file.name
        //   );
        //   return file.mv(savePath);
        // });

        //await Promise.all(promises);

        const fileName = new Date().getTime().toString() + path.extname(file.name);
        const savePath = path.join(
            __dirname,
            "public",
            "images",
            "uploaded_images",
            fileName
        );
        if (file.truncated) {
            throw new Error("File size is too big...");
        }
        if (file.mimetype !== "image/jpeg") {
            throw new Error("Only jpegs are supported");
        }
        await file.mv(savePath);
        gallery.push(fileName);
    } catch (error) {
        console.log(error);
        res.send("error uploading images");
    }
});

//route to get number of addlisting that can be done
app.get("/numberOfAddListing/:email", requireAuth, (req, res) => {
    let sql = "SELECT plan FROM users WHERE email = ?";
    sqlCon.query(sql, [req.params.email], (err, result) => {
        if (err) throw err;
        console.log(subscriptionPlans[result[0].plan].noOfListing);
        let defaultCount = subscriptionPlans[result[0].plan].noOfListing;
        // res.send(subscriptionPlans[result[0].plan].noOfListing.toString());
        let sql = "SELECT COUNT(*) AS count FROM `add_listing` WHERE email = ? ";
        sqlCon.query(sql, [req.params.email], (err, result) => {
            if (err) throw err;
            console.log(
                "number of addlisting done by ",
                req.params.email,
                result[0].count
            );
            let chancesLeft = defaultCount - result[0].count;
            res.send(chancesLeft.toString());
        });
    });
});

//time left for subscription end
app.get("/subscriptionEndsIn/:email", (req, res) => {
    console.log("subscrip");
    let sql =
        "SELECT  {fn TIMESTAMPDIFF(SQL_TSI_DAY,date, NOW())} AS timeLeft FROM `users` WHERE email = ?";
    sqlCon.query(sql, [req.params.email], (err, result) => {
        if (err) throw err;
        res.send((365 - result[0].timeLeft).toString());
    });
});

app.post("/search", (req, res) => {
    let sql;
    if (req.body.catagory === "" && req.body.businessName === "") {
        sql =
            "SELECT * FROM `add_listing` WHERE address LIKE '%" +
            req.body.location +
            "%'";
    } else if (req.body.catagory === "" && req.body.address === "") {
        sql =
            "SELECT * FROM `add_listing` WHERE businessName LIKE '%" +
            req.body.businessName +
            "%'";
    } else if (req.body.businessName === "" && req.body.address === "") {
        sql =
            "SELECT * FROM `add_listing` WHERE category LIKE '%" +
            req.body.catagory +
            "%'";
    } else if (
        req.body.businessName !== "" &&
        req.body.address !== "" &&
        req.body.catagory === ""
    ) {
        sql =
            "SELECT * FROM `add_listing` WHERE businessName LIKE '%" +
            req.body.businessName +
            "%' AND address LIKE '%" +
            req.body.address +
            "%'";
    } else if (
        req.body.businessName !== "" &&
        req.body.catagory !== "" &&
        req.body.address === ""
    ) {
        sql =
            "SELECT * FROM `add_listing` WHERE businessName LIKE '%" +
            req.body.businessName +
            "%' AND address LIKE '%" +
            req.body.address +
            "%'";
    } else if (
        req.body.businessName === "" &&
        req.body.catagory !== "" &&
        req.body.address !== ""
    ) {
        sql =
            "SELECT * FROM `add_listing` WHERE category LIKE '%" +
            req.body.catagory +
            "%' AND address LIKE '%" +
            req.body.address +
            "%'";
    } else {
        sql =
            "SELECT * FROM `add_listing` WHERE category LIKE '%" +
            req.body.catagory +
            "%' AND address LIKE '%" +
            req.body.address +
            "%' AND businessName LIKE '%" +
            req.body.businessName +
            "%'";
    }
    console.log("running search ", sql);

    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//admin generate coupon
app.post("/admin/generateCoupon/:email", requireAuth, (req, res) => {
    let couponName = req.body.couponName;
    let couponExpire = req.body.couponExpire;
    let couponAmount = req.body.couponAmount;
    let noOfAllowedUser = req.body.noOfAllowedUser;

    let coupon = "offer_" + makeCoupon();
    console.log("coupon generated " + coupon);

    let sql =
        "INSERT INTO couponsystem (coupon,couponName,couponExpire,couponAmount,noOfAllowedUser) VALUES (?,?,?,?,?)";
    sqlCon.query(
        sql, [coupon, couponName, couponExpire, couponAmount, noOfAllowedUser],
        (err, result) => {
            if (err) throw err;
            console.log("coupon inserted in db ", result);
            res.redirect("/admin/createCoupon/" + req.params.email);
        }
    );
});

//api to get all plans
app.get("/allPlans", (req, res) => {
    if (subscriptionPlans.isCouponApllied) {
        res.send(tempSubscriptionPlans);
    } else {
        res.send(subscriptionPlans);
    }
});
//get plans for signup subscription

app.get("/plans/:email/:urlToken", (req, res) => {
    //setting the coupon object to default to remove the settings
    subscriptionPlans.isEdited = false;
    subscriptionPlans.isCouponApllied = false;
    if (req.params.urlToken) {
        jwt.verify(req.params.urlToken, "urlStringSecret", (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect("/home");
            } else {
                console.log(decodedToken);
                user = decodedToken.id;
                console.log(req.params.email);
                res.cookie("urlJwt", req.params.urlToken, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });

                res.render("plans", { email: req.params.email });
            }
        });
    } else {
        res.redirect("/home");
    }
});

//apply coupon
app.post("/applyCoupon/:email", async(req, res) => {
    let coupon = req.body.coupon;
    let email = req.params.email;

    //check if the user has already applied for the coupon
    let sql = "SELECT * FROM appliedcoupon WHERE coupon = ? AND email = ?";
    sqlCon.query(sql, [coupon, email], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            let sql = "SELECT * FROM couponsystem WHERE coupon = ?";
            sqlCon.query(sql, [coupon], async(err, result) => {
                if (err) throw err;

                if (
                    result.length === 1 &&
                    result[0].noOfAllowedUser >= 1 &&
                    result[0].status === "working"
                ) {
                    console.log(coupon + " is valid coupon ");
                    //changing the boolean isCoupon applied to true
                    subscriptionPlans.isCouponApllied = true;

                    if (subscriptionPlans.isEdited === false) {
                        //and saving the coupon number
                        if (result[0].couponAmount !== 100) {
                            tempSubscriptionPlans.coupon = coupon;

                            //copying in tempplans so that the amount can be decreased
                            console.log("temp ", tempSubscriptionPlans);
                            console.log("orignal", subscriptionPlans);

                            //changing the plans in temp object according to coupon
                            tempSubscriptionPlans.Starter.price =
                                subscriptionPlans.Starter.price -
                                (result[0].couponAmount / 100) *
                                subscriptionPlans.Starter.price;

                            tempSubscriptionPlans.Professional.price =
                                subscriptionPlans.Professional.price -
                                (result[0].couponAmount / 100) *
                                subscriptionPlans.Professional.price;

                            // tempSubscriptionPlans.Enterprise.price =
                            //   subscriptionPlans.Enterprise.price -
                            //   (result[0].couponAmount / 100) *
                            //     subscriptionPlans.Enterprise.price;

                            tempSubscriptionPlans.Business.price =
                                subscriptionPlans.Business.price -
                                (result[0].couponAmount / 100) *
                                subscriptionPlans.Business.price;
                            console.log(tempSubscriptionPlans);

                            //changing isEdited to true
                            subscriptionPlans.isEdited = true;
                            res.status(400).json({ error: coupon + " applied!" });
                        } else {
                            console.log("-------user", user);

                            const token = await createToken(req.params.email);
                            res.cookie("jwt", token, {
                                maxAge: maxAge * 1000,
                                httpOnly: true,
                            });
                            let plan = "Starter";

                            try {
                                if (Object.keys(user).length > 1) {
                                    console.log("new signUp");
                                    try {
                                        user = Object.assign(user, { plan: plan });

                                        saveUser(user);
                                    } catch (error) {
                                        console.log(error);
                                    }

                                    // res.status(201).json({ user: user.email, token });
                                } else if (Object.keys(user).length === 1) {
                                    console.log(
                                        "inside renew subscription almost done payment done"
                                    );
                                    renewSubscription(plan);
                                }

                                //as this payment was done by coupon saving this information to db so that user doesnt apply coupon again
                                let sql =
                                    "INSERT INTO `appliedcoupon` (`id`, `coupon`, `email`) VALUES (NULL, ? ,?) ";
                                sqlCon.query(sql, [coupon, req.params.email], (err, result) => {
                                    if (err) throw err;
                                    console.log("coupon applied inserted in database");
                                });
                                //as the coupon is applied subtract number of users from the coupon table
                                subtractUser(coupon);
                            } catch (error) {
                                console.log(error);
                            }

                            res.status(201).json({ user: req.params.email });
                        }
                    } else {
                        res.status(400).json({ error: " already applied" });
                    }
                } else {
                    res.status(400).json({ error: " invalid coupon" });
                }
            });
        } else {
            res.status(400).json({ error: "You have already used the coupon" });
        }
    });
});

app.get("/admin/createCoupon/:email", requireAuth, (req, res) => {
    let sql = "SELECT * FROM couponsystem";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        res.render("createCoupon", { email: req.params.email, allCoupons: result });
    });
});

//delete coupon by admin
app.get("/deleteCoupon/:coupon/:email", requireAuth, (req, res) => {
    console.log("deleting coupon on admin request " + req.params.coupon);
    let sql = "UPDATE couponsystem SET status = 'expired' WHERE coupon = ?";
    sqlCon.query(sql, [req.params.coupon], (err, result) => {
        if (err) throw err;
        console.log(req.params.coupon, " coupon expired");
        res.redirect("/admin/createCoupon/" + req.params.email);
    });
});

//get req for allAddlisting
app.get("/allAddlistingWithoutLogin", (req, res) => {
    let sql = "SELECT id,businessName, category FROM `add_listing`";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//get req for gallery
app.get("/getGallery", (req, res) => {
    let sql = "SELECT * FROM gallery";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//get req for allAddlisting for signed in users
app.get("/allAddlisting", requireAuth, (req, res) => {
    let sql =
        "SELECT * FROM `add_listing` INNER JOIN users ON add_listing.email = users.email";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/homeAfterLogin/:email", requireAuth, checkCurrentUser, (req, res) => {
    console.log("inside home after login");
    let sql =
        "SELECT * FROM `add_listing` INNER JOIN users ON add_listing.email = users.email ";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        const listing = result;
        let sql1 = "select * from gallery";
        sqlCon.query(sql1, (err, result1) => {
            if (err) console.log(err);
            console.log(result1);

            res.render("homewithlogin", {
                email: req.params.email,
                listing: listing,
                gallery: result1,
            });
        });
    });
});

app.post("/comment", requireAuth, (req, res) => {
    let comment1 = req.body.comment;
    let email = req.body.email;
    let addListingId = req.body.addListingId;
    comment(comment1, addListingId, email);
});

app.post("/like", requireAuth, (req, res) => {
    let email = req.body.email;
    let addListingId = req.body.addListingId;
    like(email, addListingId);
});

//my profile
app.get("/myProfile/:email", requireAuth, (req, res) => {
    let email = req.params.email;
    let sql =
        "SELECT email,name,mobileNumber,companyName,plan FROM users WHERE email = ?";
    sqlCon.query(sql, [email], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//update profile
app.post("/updateProfile", requireAuth, (req, res) => {
    let sql = "UPDATE users SET name = ?, mobileNumber= ? WHERE email = ?";
    sqlCon.query(
        sql, [req.body.name, req.body.phone, req.body.email],
        (err, result) => {
            if (err) throw err;
            console.log(req.body.email, " profile updated", result, req.body.phone);
        }
    );
});
//admin get all users
app.get("/admin/getAllUsers", requireAuth, (req, res) => {
    let sql =
        "SELECT email, name, mobileNumber, companyName, plan,access FROM `users`";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        // res.send(result);
        console.log(result[0]);
        res.render("User", { allusers: result });
    });
});
app.post("/createAdminLogin", async(req, res) => {
    //encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    let sql = "INSERT INTO adminLogin (email, password) VALUES (?,?)";
    sqlCon.query(sql, [req.body.email, hashed], (err, result) => {
        if (err) throw err;
        console.log("admin inserted");
    });
});
app.get("/adminLogin", (req, res) => {
    res.render("adminlogin");
});
app.post("/adminLogin", (req, res) => {
    let sql = "SELECT * FROM adminLogin WHERE EMAIL = ?";
    sqlCon.query(sql, [req.body.email], async(err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            console.log(" Email not registerd!");
            res.status(400).json({ error: "Email not registerd!" });
        } else {
            console.log("checking password");
            const isCorrectPassword = bcrypt.compareSync(
                req.body.password,
                result[0].password
            );
            if (isCorrectPassword) {
                const token = await createToken(req.body.email);
                res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
                res.status(201).json({ user: req.body.email });
            } else {
                res.status(400).json({ error: { password: "Incorrect Password!" } });
            }
        }
    });
});
//get users add listing
app.get("/allAddlisting/:email", requireAuth, (req, res) => {
    let sql = "SELECT * FROM `add_listing` WHERE email = ?";
    sqlCon.query(sql, [req.params.email], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/admin/accessToggle/:email", requireAuth, (req, res) => {
    console.log("inside access togle");

    let sql = "SELECT access FROM users WHERE email = ?";
    sqlCon.query(sql, [req.params.email], (err, result) => {
        if (err) throw err;
        console.log(result[0].access);

        if (result[0].access === "allowed") {
            sql = "UPDATE users SET access = 'removed' WHERE email = ?";
            sqlCon.query(sql, [req.params.email], (err, result) => {
                if (err) throw err;
                console.log(req.params.email, " access removed");
                res
                    .status(201)
                    .json({ email: req.params.email, action: "access removed" });
            });
        } else if (result[0].access === "removed") {
            sql = "UPDATE users SET access = 'allowed' WHERE email = ?";
            sqlCon.query(sql, [req.params.email], (err, result) => {
                if (err) throw err;
                console.log(req.params.email, " access allowed");
                res
                    .status(201)
                    .json({ email: req.params.email, action: "access allowed" });
            });
        }
    });
});

app.get("/logOut", (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/home");
});

//forget password user

app.get("/userForgetPassword", (req, res) => {
    res.render("userForgetPassword");
});

app.post("/forgetPassword", (req, res) => {
    let email = req.body.email;
    console.log(email, " forgot his/her password");

    let sql = "SELECT email FROM users WHERE email = ?";

    sqlCon.query(sql, [email], async(err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            //create url token
            const urlToken = await createTokenForUrl(email);

            var mailOptions = {
                from: "sameer.vashisth.egs@gmail.com",
                to: req.body.email,
                subject: "Welcome To Brahman Chamber Of Commerce",
                text: "Forget Password",
                html: `<h1>Please change your password by clicking the link below</h1><br>
  <a href = 'http://localhost:3000/changePassword/${urlToken}'>Link</a>`,
            };
            mailUser(mailOptions);
            res.status(201).json({ user: email });
        } else {
            res.status(400).json({ error: { email: "email doesnt exist" } });
        }
    });
});

app.get("/changePassword/:urlToken", (req, res) => {
    if (req.params.urlToken) {
        jwt.verify(req.params.urlToken, "urlStringSecret", (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: { token: "Invalid Token" } });
                res.redirect("/home");
            } else {
                res.cookie("urlJwt", req.params.urlToken, {
                    maxAge: 24 * 60 * 60,
                    httpOnly: true,
                });
                res.render("changePasswordForUser", { email: decodedToken.id });
            }
        });
    } else {
        res.status(400).json({ error: { token: "No Token" } });
        res.redirect("/home");
    }
});

app.post("/changePassword", checkCurrentUser, (req, res) => {
    var cookies = parseCookies(req);
    //console.log("cookies ", cookies);

    let urlToken = cookies.urlJwt;
    console.log(urlToken);

    jwt.verify(urlToken, "urlStringSecret", (err, decodedToken) => {
        if (err) {
            console.log(err);
            res.render("/home");
        } else {
            if (req.body.password === req.body.confirmPassword) {
                let passStrength = passwordStrength(req.body.password, defaultOptions);
                console.log("password strength ", passStrength.value);
                if (passStrength.value === "Too weak") {
                    console.log("paswword weak cought");
                    res
                        .status(400)
                        .json({ error: { password: "password must contain any special char. & num" } });
                } else {
                    console.log(decodedToken);
                    res.status(200).json({ user: "password changed" });
                    changePassword(req.body, decodedToken.id);
                }
            } else {
                res
                    .status(400)
                    .json({ error: { password: "password is not matching  " } });
            }
        }
    });
});

//change password for logined users
app.get("/changePasswordForLogin/:email", requireAuth, (req, res) => {
    res.render("userChangePassword", { email: req.params.email });
});

app.post("/changePasswordForLogin/", requireAuth, (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        var cookies = parseCookies(req);
        console.log(cookies.jwt);
        const token = cookies.jwt;

        if (req.body.password === req.body.confirmPassword) {
            let passStrength = passwordStrength(req.body.password, defaultOptions);
            console.log("password strength ", passStrength.value);
            if (passStrength.value === "Too weak") {
                console.log("paswword weak cought");
                res.status(400).json({ error: { password: "password must contain any special char. & num" } });
            } else {
                jwt.verify(token, "stringSecret", (err, decodedToken) => {
                    console.log(decodedToken);
                    res.status(200).json({ user: "password changed" });
                    changePassword(req.body, decodedToken.id);
                });
            }
        } else {
            res
                .status(400)
                .json({ error: { password: "password is not matching  " } });
        }
    }
});

//forget password admin
app.get("/admin/forgetPassword", (req, res) => {
    res.render("adminForgetPasswordWithoutLogin");
});
app.post("/admin/forgetPassword", (req, res) => {
    let email = req.body.email;
    console.log(email, " forgot his/her password");

    let sql = "SELECT email FROM adminlogin WHERE email = ?";

    sqlCon.query(sql, [email], async(err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            //create url token
            const urlToken = await createTokenForUrl(email);

            var mailOptions = {
                from: "sameer.vashisth.egs@gmail.com",
                to: req.body.email,
                subject: "Welcome To Brahman Chamber Of Commerce",
                text: "Forget Password",
                html: `<h1>Please change your password by clicking the link below</h1><br>
  <a href = 'http://localhost:3000/admin/changePassword/${urlToken}'>Link</a>`,
            };
            mailUser(mailOptions);
            res.status(201).json({ user: email });
        } else {
            res.status(400).json({ error: { email: "email doesnt exist" } });
        }
    });
});

//change password for logined admin
app.get("/admin/changePasswordForLogin/:email", requireAuth, (req, res) => {
    res.render("adminChangePassword", { email: req.params.email });
});

app.get("/admin/changePassword/:urlToken", (req, res) => {
    if (req.params.urlToken) {
        jwt.verify(req.params.urlToken, "urlStringSecret", (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: { token: "Invalid Token" } });
                res.redirect("/home");
            } else {
                console.log(decodedToken);

                res.cookie("urlJwt", req.params.urlToken, {
                    maxAge: 24 * 60 * 60,
                    httpOnly: true,
                });
                res.render("adminForgetPassword", { email: decodedToken.id });
            }
        });
    } else {
        res.status(400).json({ error: { token: "No Token" } });
        res.redirect("/home");
    }
});

app.post("/admin/changePassword", checkCurrentUser, (req, res) => {
    var cookies = parseCookies(req);
    //console.log("cookies ", cookies);

    let urlToken = cookies.urlJwt;
    console.log(urlToken);

    jwt.verify(urlToken, "urlStringSecret", (err, decodedToken) => {
        if (err) {
            console.log(err);
            res.render("/home");
        } else {
            console.log("user is paying", decodedToken);

            if (req.body.password === req.body.confirmPassword) {
                let passStrength = passwordStrength(req.body.password, defaultOptions);
                console.log("password strength ", passStrength.value);
                if (passStrength.value === "Too weak") {
                    console.log("paswword weak cought");
                    res
                        .status(400)
                        .json({ error: { password: "password must contain any special char. & num" } });
                } else {
                    console.log(decodedToken);
                    res.status(200).json({ user: "password changed" });
                    adminChangePassword(req.body, decodedToken.id);
                }
            } else {
                res
                    .status(400)
                    .json({ error: { password: "password is not matching  " } });
            }
        }
    });
});

app.post(
    "/admin/changePasswordLogedIn",
    requireAuth,
    checkCurrentUser,
    (req, res) => {
        var cookies = parseCookies(req);
        console.log(cookies.jwt);
        const token = cookies.jwt;

        if (req.body.password === req.body.confirmPassword) {
            let passStrength = passwordStrength(req.body.password, defaultOptions);
            console.log("password strength ", passStrength.value);
            if (passStrength.value === "Too weak") {
                console.log("paswword weak cought");
                res.status(400).json({ error: { password: "password must contain any special char. & num" } });
            } else {
                jwt.verify(token, "stringSecret", (err, decodedToken) => {
                    console.log(decodedToken);
                    res.status(200).json({ user: "password changed" });
                    adminChangePassword(req.body, decodedToken.id);
                });
            }
        } else {
            res
                .status(400)
                .json({ error: { password: "password is not matching  " } });
        }
    }
);
//functions----------------------------------------------------------------------------------------------------------------

//function to push gallery array into database
function galleryDao(addListingForiegnKey) {
    for (let file of gallery) {
        let sql = "INSERT INTO gallery (photo,addListingId) VALUES (?,?)";
        sqlCon.query(sql, [file, addListingForiegnKey], (err, result) => {
            if (err) throw err;
            console.log("image inserted in database");
        });
    }
    gallery = [];
}

//signup dao function
function saveUser(data) {
    let email = data.email;
    let password = data.password;
    let mobileNumber = data.mobileNumber;
    let name = data.name;
    let companyName = data.companyName;
    let plan = data.plan;

    console.log(
        " " +
        email +
        " " +
        password +
        " " +
        mobileNumber +
        " " +
        name +
        " " +
        companyName +
        " " +
        plan
    );

    let query =
        "INSERT INTO users (email, password, name, mobileNumber, companyName, plan) VALUES (?,?,?,?,?,?)";
    sqlCon.query(
        query, [email, password, name, mobileNumber, companyName, plan],
        (err, result) => {
            if (err) console.log(err);
            console.log("new user signedUp " + result);
        }
    );
}

//function for changing status
function planStatus() {
    // console.log("calling planStatus after three seconds");
    let subs_time = 365;
    let sql =
        "UPDATE users SET plan = 'expired' WHERE{fn TIMESTAMPDIFF(SQL_TSI_DAY," +
        "date, NOW())} >= ?";
    sqlCon.query(sql, [subs_time], (err, result) => {
        if (err) throw err;
        //console.log(result);
    });
}

//renew subscription
function renewSubscription(plan) {
    let sql = "INSERT INTO renew_subscription (email,plan) VALUES (?,?)";
    sqlCon.query(sql, [user.email, plan], (err, result) => {
        if (err) throw err;
        console.log("subscription added");
    });
}

//add renew subscription to user table
function addRenewAll() {
    //all users whose subscription has expired
    let sql = "SELECT email FROM `users` WHERE plan = 'expired'";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result.length);
        for (let key in result) {
            // console.log(result[key].email);
            //check if the expired user has a subscription in renew subscription tab;e
            let sql = "SELECT * FROM `renew_subscription` WHERE email =?";
            sqlCon.query(sql, [result[key].email], (err, result) => {
                if (err) throw err;
                if (result.length == 0) {
                    // console.log("no renewd subscription ");
                } else if (result.length >= 1) {
                    console.log("found renewd subscription for " + result[0].email);
                    //adding subscription to users table when subscription found
                    let sql = "UPDATE users SET date = NOW() , plan = ? WHERE email =?";
                    sqlCon.query(
                        sql, [result[0].plan, result[0].email],
                        (err, result) => {
                            if (err) throw err;
                            console.log("subscription added to users table ");
                        }
                    );

                    //deleting the added subscrition from the renew subscription table
                    let sql1 = "DELETE FROM renew_subscription WHERE id = ?";
                    sqlCon.query(sql1, [result[0].id], (err, result) => {
                        if (err) throw err;
                        console.log("deleting used subscription from renew table ");
                        console.log(result);
                    });
                }
            });
        }
    });
}

// generate coupons
function makeCoupon() {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//function to dubtract one user from the coupon table when coupon is applied
function subtractUser(coupon) {
    let sql =
        "UPDATE couponsystem SET noOfAllowedUser = noOfAllowedUser -1 WHERE coupon = ?";
    sqlCon.query(sql, [coupon], (err, result) => {
        if (err) throw err;
        console.log("number of user subtracted by one at coupon used table");
    });
}

//function to delete the coupon which has expired both by time or by number of users
function expireCoupon() {
    // console.log("checking for expired coupon in 5 sec");

    let sql =
        "UPDATE couponsystem SET status = 'expired' WHERE ({fn TIMESTAMPDIFF(SQL_TSI_DAY, NOW(),couponExpire)}) <=0 OR noOfAllowedUser <=0";
    sqlCon.query(sql, (err, result) => {
        if (err) throw err;
    });
}

//Like post
function like(email, id) {
    let sql = "SELECT * FROM likes WHERE addLitingId = ? AND email = ?";
    sqlCon.query(sql, [id, email], (err, result) => {
        if (err) throw err;
        if (result.length === 1) {
            console.log("already liked deleting like " + email);
            let sql = "DELETE FROM likes WHERE addLitingId = ? AND email = ?";
            sqlCon.query(sql, [id, email], (err, result) => {
                if (err) throw err;
                console.log("like deleted");
            });
        } else {
            let sql = "INSERT INTO likes (addLitingId,email) values (?,?)";
            sqlCon.query(sql, [id, email], (err, result) => {
                if (err) throw err;
                console.log("liked add listing by ", email);
            });
        }
    });
}

//comment post
function comment(comment, id, email) {
    let sql = "INSERT INTO comment (comment,addListingId,email) VALUES (?,?,?)";
    sqlCon.query(sql, [comment, id, email], (err, result) => {
        if (err) throw err;
        console.log("comment inserted");
    });
}

function mailUser(mailOptions) {
    transporter1.transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
//age of jwt cookie
const maxAge = 3 * 24 * 60 * 60;

const createToken = async(id) => {
    return jwt.sign({ id }, "stringSecret", {
        expiresIn: maxAge,
    });
};

const createTokenForUrl = async(id) => {
    return jwt.sign({ id }, "urlStringSecret", {
        expiresIn: 24 * 60 * 60,
    });
};

// const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   //check if json webtoken exist and is valid
//   if (token) {
//     jwt.verify(token, "stringSecret", (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.redirect("/home");
//       } else {
//         console.log(decodedToken);

//         next();
//       }
//     });
//   } else {
//     res.redirect("/home");
//   }
// };

//change password
async function changePassword(body, email) {
    console.log(" body", body, " email ", email);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.password, salt);

    let sql = "update users set password = ? where email = ?";
    sqlCon.query(sql, [hashed, email], (err, result) => {
        if (err) console.log(err);
        console.log("password updated", sql);
    });
}

async function adminChangePassword(body, email) {
    console.log(" body", body, " email ", email);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.password, salt);

    let sql = "update adminlogin set password = ? where email = ?";
    sqlCon.query(sql, [hashed, email], (err, result) => {
        if (err) console.log(err);
        console.log("admin password updated");
    });
}

//get cookies from headers and put them in headerrs
function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc &&
        rc.split(";").forEach(function(cookie) {
            var parts = cookie.split("=");
            list[parts.shift().trim()] = decodeURI(parts.join("="));
        });

    return list;
}
app.listen(3000, () => {
    console.log("server started at port 3000");
});