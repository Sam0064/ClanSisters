const router = require('express').Router();
const {Clan, User} = require('../database');
const auth = require('./authMiddleware');

router.get('/', (req, res) => {
  return Clan.findAll(req.query)
    .then(clans => {
      res.json({results: clans});
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get('/:clan', (req, res) => {
  return Clan.read({id: req.params.clan})
    .then(clan => {
      if (clan) {
        res.json({results: clan});
      } else {
        res.status(400).send('Clan doesn\'t exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get('/:clan/members', (req, res) => {
  Clan.model.findOne({
    include: [{
      model: User.model,
    }],
    where: {id: req.params.clan}
  })
    .then((clan) => {
      if (clan) {
        res.json({results: clan.members});
      } else {
        throw new Error('Clan does not exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.post('/', auth.isLoggedIn('redirect'), (req, res) => {
  return Clan.create(req.body)
    .then(newClan => {
      res.status(201).json(newClan);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.post('/:clan', auth.isLoggedIn('redirect'), (req, res) => {
  Clan.update({id: req.params.clan}, req.body)
    .spread(affected => {
      if (affected) {
        res.sendStatus(202);
      } else {
        res.status(400).send('Clan doesn\'t exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.delete('/:clan', auth.isLoggedIn('redirect'), (req, res) => {
  Clan.delete({id: req.params.clan})
    .then(affected => {
      if (affected) {
        res.sendStatus(202);
      } else {
        res.status(400).send('Clan doesn\'t exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
