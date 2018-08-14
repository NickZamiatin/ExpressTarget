const knex= require('./knex');

module.exports = {
  getAllTargets(){
    return knex('timemangment')
  },
  getOneTarget(id){
    return knex('timemangment').where('id', id).first();
  },
  createTarget(target){
    return knex('timemangment').insert(target, '*')
  },
  updateTarget(id, event ){
    return knex('timemangment').where('id', id).update(event, '*');
  },
  deleteTarget(id, event ){
    return knex('timemangment').where('id', id).del();
  }
}