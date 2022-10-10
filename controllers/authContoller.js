const { hash } = require('../lib/hash');
const { genarateToken } = require('../lib/jwt');
const User = require('../models/user');

// signup with email password;
module.exports.signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        // check if user is exist
        let user = await User.findOne({email});
        if (user) {
            return res.status(409).json({message: "user already exist!"});
        }

        // hashing the password
        const hashedPassword = await hash(password);

        user = new User({firstName, lastName, email, password: hashedPassword});
        await user.save();
        return res.status(200).json({message: "Signup successfull", user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }})

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// signin with email & password
module.exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user is exist
        let user = await User.findOne({email});
        if (!user) {
            return res.status(409).json({message: "User desn't exist!"});
        }

        // validate the password
        const isValidatePassword = await user.isValidatePassword(password);
        if (isValidatePassword) {
            const token = await genarateToken({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            })
            return res.send({
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                token
            });
        } else {
            return res.status(400).json({ message: "Invalid credential" });
        }



        res.send("Sign In");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}