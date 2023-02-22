const { conference, keynote, user } = require('@schnider94/models');

let UserModel;
let ConferenceModel;
let KeynoteModel;

export const getUserModel = function() {
    if (UserModel) return UserModel;

    const UserSchema = user.create();
    UserModel = mongoose.connection.model('user', UserSchema);

    return UserModel;
}

export const getConferenceModel = function() {
    if (ConferenceModel) return ConferenceModel;

    const ConferenceSchema = conference.create();
    ConferenceModel = mongoose.connection.model('conference', ConferenceSchema);

    return ConferenceModel;
}

export const getKeynoteModel = function() {
    if (KeynoteModel) return KeynoteModel;

    const KeynoteSchema = keynote.create();
    KeynoteModel = mongoose.connection.model('keynote', KeynoteSchema);

    return KeynoteModel;
}
