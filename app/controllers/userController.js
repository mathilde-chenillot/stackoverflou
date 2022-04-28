const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {

        if (req.body.email.trim() === '') {
            return res.status(400).json({
                error: 'Veuillez entrer une adresse email',
                data: req.body,
            });
        };

        if (req.body.password.trim() === '') {
            return res.status(400).json({
                error: 'Veuillez entrer un mot de passe',
                data: req.body,
            });
        };

        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(400).json({
                error: 'Email déjà utilisé',
                data: req.body,
            });
        };

        // if(req.body.password !== req.body.passwordConfirm) {
        //     return res.status(400).json({
        //         error: 'Les mots de passe ne correspondent pas',
        //         data: req.body,
        //     });
        // };
        
        const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUND));

        const user = await new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            creationDate: new Date(),
        }).save();
        
        res.status(201).json( { user });

        res.redirect('/login');

        console.log(req.body.email);

    } catch(error) {
        res.status(500).send(error.message);
    } finally {
        console.log('signup end');
    }
};

exports.login = async (req, res) => {
    try {
        const body = req.body;
        body.email = body.email.toLowerCase();
        const user = await User.findOne({ email: body.email });

        if(!user) {
            return res.status(400).json({
                error: 'Aucun utilisateur connu avec cet email',
                data: req.body, // note
            });
        };

        const validPassword = await bcrypt.compare(req.body.password, user.password); // 1e argument = mdp en clair, 2e = mdp en hash

        if(!validPassword) {
            return res.status(401).json({
                error: 'Mot de passe incorrect',
                data: req.body,
            });
        };

        console.log(user);

        res.redirect('/');

    } catch(error) {
        res.status(500).send(error.message);
    } finally {
        console.log('login end !');
    };
};