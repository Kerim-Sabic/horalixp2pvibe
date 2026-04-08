angular.module('horalix.core')
    .filter('metric', function () {
        return function (input) {
            return unitPrefixed(input, false);
        };
    });
