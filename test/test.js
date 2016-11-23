var phantom = require('phantom');

function generateImg(url, dist, options) {
    var sitepage = void 0;
    var phInstance = void 0;
    return phantom.create().then(function (instance) {
        phInstance = instance;
        return instance.createPage();
    }).then(function (page) {
        sitepage = page;
        return page.open(url);
    }).then(function (status) {
        console.log(status);
        // sitepage.property('viewportSize', options.viewportSize);
        // sitepage.property('clipRect', options.clipRect);
        return sitepage.property('content');
    }).then(function (content) {
        return sitepage.render(dist, { format: 'png', quality: '100' }).then(function() {
            sitepage.close();
            phInstance.exit();
        })
    }).catch(function (error) {
        throw new Error(error)
        phInstance.exit();
    });
}

generateImg('http://qq.com', './test.png')