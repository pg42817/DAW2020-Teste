var express = require('express');
var router = express.Router();
var Batismos = require('../controllers/batismos')


router.get('/api/batismos/stats', function(req, res) {
  Batismos.listarStats()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/api/batismos/:id', function(req, res) {
  Batismos.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/api/batismos', function(req, res) {
  if(req.query.ano)
  {
    Batismos.listarAno(req.query.ano)
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
  }
  else{
    Batismos.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
  }
});
router.get('/api/batisado',function(req,res){
  Batismos.batisados()
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
})


router.get('/api/progenitores',function(req,res){
  Batismos.progenitores()
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
})


module.exports = router;