const express = require('express');
const router= express.Router();
const app = express();

app.use(express.json());

router.get('/', (req, res) => {
    res.json({name: "users"})
});

module.exports = router;