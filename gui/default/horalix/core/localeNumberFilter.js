angular.module('horalix.core')
    .filter('localeNumber', function () {
        return function (input) {
            return input.toLocaleString();
        };
    });
