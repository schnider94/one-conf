
exports.omitSecureFields = function(doc) {
    return Object.fromEntries(
        Object
            .entries(doc)
            .filter(([key]) => !key.startsWith('secret'))
    )
}
