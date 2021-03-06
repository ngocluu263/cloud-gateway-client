var services = angular.module('agrihub.services', ['ngResource']);

services.factory('Nodes', ['$http', 'getCreds',
    function ($http, getCreds) {
        var baseurl = 'http://localhost:8080/nodes';
        var options = {headers: {'Authorization': 'JWT ' + getCreds.token }};

        return {
            get: function(nodeId) {
                return $http.get(baseurl + '/' + nodeId + '/', options);
            },
            save: function(node) {
                var url = node.id ? baseurl + '/' + node.id + '/': baseurl + '/';

                if (url == baseurl + '/') {
                    return $http.post(url, node, options);
                } else {
                    return $http.put(url, node, options);
                }
            },
            query: function () {
                return $http.get(baseurl + '/', options);
            },
            delete: function(nodeId) {
                return $http.delete(baseurl + '/' + nodeId + '/', options);
            }
        } 
    }]
);

services.factory('Sensors', ['$http', 'getCreds',
    function ($http, getCreds) {
        var basenodeurl = 'http://localhost:8080/nodes';
        var options = {headers: {'Authorization': 'JWT ' + getCreds.token }};

        return {
            get: function(nodeId, sensorId) {
                return $http.get(basenodeurl + '/' + nodeId + '/sensor/' + sensorId + '/', options);
            },
            save: function(node, sensor) {
                var url = sensor.id ? 
                    basenodeurl + '/' + node.id + '/sensor/' + sensor.id + '/': 
                    basenodeurl + '/' + node.id + '/sensor/';

                if (undefined == sensor.id) {
                    return $http.post(url, sensor, options);
                } else {
                    return $http.put(url, sensor, options);
                }
            },
            query: function (nodeId) {
                return $http.get(basenodeurl + '/' + nodeId + '/' + 'sensor/', options);
            },
            delete: function(url) {
                return $http.delete(url, options);
            }
        } 
    }]
);

services.factory('Subscriptions', ['$http', 'getCreds',
    function ($http, getCreds) {
        var basenodeurl = 'http://localhost:8080/subscriptions';
        var options = {headers: {'Authorization': 'JWT ' + getCreds.token }};

        return {
            get: function(nodeId, sensorId) {
                return $http.get(basenodeurl + '/' + nodeId + '/' + 'sensor/' + sensorId + '/', options);
            },
            save: function(book) {
                var url = book.id ? basenodeurl + '/' + book.id + '/': basenodeurl + '/';

                if (url === basenodeurl) {
                    return $http.post(url, book, options);
                } else {
                    return $http.put(url, book, options);
                }
            },
            filterbyuser: function (page=1) {
                return $http.get(basenodeurl + '/user/' + getCreds.user.username + '/?page=' + page, options);
            },
            filterbynode: function (node, page=1) {
                return $http.get(basenodeurl + '/node/' + node + '/?page=' + page, options);
            },
            filterbynodesensor: function (node, sensor, page=1) {
                return $http.get(basenodeurl + '/node/' + node + '/sensor/' + sensor + '/?page=' + page, options);
            }
        } 
    }]
);

services.factory('Login', ['$resource',
    function($resource) {
        return $resource("http://localhost:8080/user-auth/", {}, {
            login: {method: 'POST', cache: false, isArray: false}            
        });
    }]
);