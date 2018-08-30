const knex= require('./knex');

module.exports = {
  getAllTargets(user_id){ //only get targets where user_id is currently logged in user.id
    return knex('timemangment').orderBy('id','asc').where('user_id',user_id);
  },
  getOneTarget(id,user_id){ // after getting the target, make sure user_id is user.id, if not, return unauthorized error
    return knex('timemangment').where('id', id).first().where('user_id',user_id);
  },
  createTarget(target, user_id){ // before inserting set user_id to be user.id
    target.user_id = user_id
    return knex('timemangment').insert(target, '*');
  },
  updateTarget(id, event, user_id){  // get target first, make sure user_id is user.id, if not, return unauthorized error, if so, update it
    return knex('timemangment').where('id', id).where('user_id', user_id).update(event, '*');
  },
  deleteTarget(id, user_id ){  // get target first, make sure user_id is user.id, if not, return unauthorized error, if so, delete it
    return knex('timemangment').where('id', id).where('user_id', user_id).del();
  },

  getOneUser (id) {
    return knex('users').where('id', id).first();
  },
  getOneByEmailByuser (email) {
    return knex('users').where('email', email).first();
  },
  createNewUser(user){
    return knex('users').insert(user, 'id').then(ids =>{
      return ids[0]
    })
  }
}