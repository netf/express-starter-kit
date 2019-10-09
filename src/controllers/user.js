const controller = {};

controller.signin = async (req, res, next) => { };
controller.signup = async (req, res, next) => { };
controller.user = async (req, res, next) => {
    res.send(req.user);
};

export default controller;