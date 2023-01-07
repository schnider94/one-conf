exports.createApp = () => {
    const queue = [];
    const app = {};

    app.use = function(fn) {
        queue.push(fn)

        return app;
    };

    app.start = async function(server) {
        for (fn of queue) {
            await new Promise(resolve => fn(resolve))
        }

        server.start();
    };

    return app;
}
