const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userHome = (req, res) => {
    res.send('every thing is good');
}

exports.POSTuserLogin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (err) throw err;
                    if (success) {
                        // payload to pass to jwt function
                        const payLoad = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                        // generate a token after user was vriflide by email and password
                        jwt.sign(payLoad, 'secret', { expiresIn: 60 * 60 }, (err, token) => {
                            res.status(200).json({
                                status: 'Success',
                                token: 'Bearer ' + token
                            });
                        });
                       
                    } else {
                        res.status(401).json({ msg: 'You are not frobiden to access here' })
                    }
                })
            }
        })
        .catch(err => console.log(err));
}

exports.POSTuserRegister = (req, res) => {
    // 
    const { name, email, password } = req.body;
    User.findOne( { email })
        .then(user => {
            if (!user) {
                 
            const newUser = new User({
                name,
                email,
                password
            });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.status(200).json(user)
                            })
                            .catch(err => console.log(err))
                    })
                }); 
               
            } else {
                return res.status(404).json({ msg: 'this email alredy exist!!' });
            }
           
        })
        .catch(err => console.log(err));
}