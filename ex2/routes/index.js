var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/classes/:id',function(req, res){
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id+'?token='+token)
          .then(dados=>{
            axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id+'/descendencia?token='+token)
            .then(descendentes=>{              
              console.log(descendentes.data)
              res.render('classe', { classe:dados.data,descendentes:descendentes.data});
            })
            .catch(e=>{
                console.log("Erro: nao consegui obter os dados! " + e)
            })
          })
          .catch(e=>{
              console.log("Erro: nao consegui obter os dados ! " + e)
          })
});

router.get('/classes',function(req, res){
  axios.get('http://clav-api.di.uminho.pt/v2/classes?token='+token)
          .then(classes=>{
            res.render('classes',{classes:classes.data})
          })
          .catch(e=>{
              console.log("Erro: nao consegui obter os dados! " + e)
          })
});

router.get('/termos',function(req, res){
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token='+token)
          .then(termos=>{
            res.render('termos',{termos:termos.data})
          })
          .catch(e=>{
              console.log("Erro: nao consegui obter os dados! " + e)
          })
});


/* GET home page. */
router.get('/', function(req, res) {
  axios.post('http://clav-api.di.uminho.pt/v2/users/login',{"username":"daw2020@teste.uminho.pt","password":"232"})
    .then(dados=>{
      token=dados.data.token
      console.log("Token: "+token+"\n\n")
      axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token='+token)
        .then(classes=>{
          res.render('index',{classes:classes.data,token:token})
        })
        .catch(e=>{
          console.log("Erro: "+e)
        })
    })
});

module.exports = router;