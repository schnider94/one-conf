const UserModelDefault = require('@schnider94/models').user;

const UserSchema = UserModelDefault.create({

});

UserModelDefault.setup(UserSchema);

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
