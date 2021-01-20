var Batismo = require('../models/batismos')

module.exports.listar = ()=>{
    return Batismo
        .find({},{_id:1,date:1,title:1,ref:1})
        .exec()
}

module.exports.consultar = (id)=>{
    return Batismo
        .find({_id:id})
        .exec()
}

module.exports.batisados = ()=>{
    return Batismo
    .aggregate([
        {$project: {bat:{$arrayElemAt:[{$split:["$title", ":"]}, 1]}}},
        {$unwind:"$bat"},
        {$project: {_id:{$arrayElemAt:[{$split:["$bat", "."]}, 0]}}}
      ])
    .sort({_id:1})
}

module.exports.progenitores =()=>{
    return Batismo
        .find({},{_id: 1, pai : 1,mae:1})
        .exec()
}

module.exports.listarAno = (ano)=>{
    return Batismo
        .find({date:{$regex:ano}})
        .exec()
}

module.exports.listarStats=()=>{
    return Batismo
    .aggregate([
        { $unwind: "$date" },
        { $group: {
            _id: {$substr: [ "$date",0, 4]},
            batismos: { $sum: 1 }
        }}
    ])
    .exec()
}
