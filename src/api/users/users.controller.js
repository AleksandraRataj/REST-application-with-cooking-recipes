const {Router} = require('express');
const User = require("../../models/user.model");
const asyncHandler = require("../asynchronous-handler");
const LoginEmailTakenException = require("../../exceptions/login-email-taken.exception");
const UserNotFoundException = require("../../exceptions/user-not-found.exception");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const router = new Router();

const SECRET_KEY = "9cc2243ab5d142fbc642ba43c46ec53756b11b9f12b854d84e372327a7a8f03514ebd9e5da6f296df605f33cedde7606a95a783fa5201bd56ab079fe0122c2fa";

authenticateToken = (req, res, next) => {
    let token = req.get("authorization");

    if (token) {
        token = token.slice(7);
        jwt.verify(token, SECRET_KEY, (err, decoded) => {

            if (err) {
                res.json({
                    message: "Invalid token"
                });
            } else {
                next();
            }
        })
    } else {
        res.json({
            message: "Access denied! Unauthorized user!"
        });
    }
}

router.post('/register', asyncHandler(async (req, res) => {

        const login = req.body.login;
        const password = bcrypt.hashSync(req.body.password);
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.email;

        const userLogin = await User.query().select('login').where('login', 'like', login);
        const userEmail = await User.query().select('email').where('email', 'like', email);

        if (userLogin[0] || userEmail[0]) {
            throw new LoginEmailTakenException();
        } else {
            const user = await User.query().insert({
                login: login,
                password: password,
                name: name,
                surname: surname,
                email: email
            })
            const expiresIn = 24 * 60;
            const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});

            res.status(200).send({"user": user, "access_token": accessToken, "expires_in": expiresIn});
        }
    })
);

router.post('/login', asyncHandler(async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const userLogin = await User.query().select('id').where('login', 'like', login);

    if (!userLogin[0]) {
        throw new UserNotFoundException;
    } else {
        const user = await User.query().findById(userLogin[0].id);
        const result = bcrypt.compareSync(password, user.password);
        if (!result) return res.status(401).send('Password not valid!');
        const expiresIn = 24 * 60;
        const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});

        res.status(200).send({"user ": user, "access_token": accessToken, "expires_in": expiresIn});
    }
}));

router.get('/', authenticateToken, asyncHandler(async (req, res) => {
    let users = User
        .query()
        .select('login', 'password', 'name', 'surname', 'email', 'users.id');

    res.send(await users);
}))

router.get('/:id', authenticateToken, asyncHandler(async (req, res) => {
    const {id} = req.params;
    const users = await User.query().findById(id);
    if (!users) throw new UserNotFoundException();
    res.send(users);
}))

router.put('/:id', authenticateToken, asyncHandler(async (req, res) => {
    const id = req.params.id;
    let updatedUser;
    const login = req.body.login;
    const password = bcrypt.hashSync(req.body.password);
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;

    const userLogin = await User.query().select('login').where('login', 'like', login);
    const userEmail = await User.query().select('email').where('email', 'like', email);

    if (userLogin[0] && userEmail[0]) {
        throw new LoginEmailTakenException();
    } else {
        updatedUser = await User.query().patchAndFetchById(id, {
            login: login,
            password: password,
            name: name,
            surname: surname,
            email: email
        })
    }
    if (!updatedUser) throw new UserNotFoundException();
    res.send(updatedUser);
}))

router.delete('/:id', authenticateToken, asyncHandler(async (req, res) => {
    const {id} = req.params;
    const user = await User.query().findById(id);

    if (!user) {
        throw new UserNotFoundException();
    }

    const trx = await User.startTransaction();

    try {
        await User.query(trx).deleteById(id);
        await trx.commit();
    } catch (e) {
        await trx.rollback()
        throw e;
    }

    res.status(204).end();
}));

module.exports = router;