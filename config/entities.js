module.exports.entities = {
    users: {
        findone: 'select * from usuario.usuariosapp where id = :id',
        getall: 'select * from usuario.usuariosapp',
        create: '',
        //update: 'update usuario.usuariosapp set :field = :value where id = :id',
        delete: 'delete usuario.usuariosapp where id = :id',
    }
}