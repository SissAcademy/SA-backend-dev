'use strict';

let withMatcher = (allowedPaths) => {
    return {
        accepts: (path) => {
            return allowedPaths.filter((item) => {
                let re = new RegExp(item, 'gi');
                return re.test(path);
            }).length > 0;
        }
    }
} 

module.exports = {
    with: withMatcher
};