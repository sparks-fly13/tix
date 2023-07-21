import exprss from 'express';

const router = exprss.Router();

router.get('/api/users/signout', (req, res) => {
    req.session = null;
    res.send({});
});

export { router as signoutRouter };