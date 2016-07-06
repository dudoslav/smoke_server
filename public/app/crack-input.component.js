angular.
        module('smokeApp').
        component('crackInput', {
            templateUrl: 'crack-input.template.html',
            controller: function crackInputController($http) {
                var self = this;
                
                self.modulus = '11875096159523629387';
                
                self.crackModulus = function() {
                    self.n1 = undefined;
                    self.n2 = undefined;
                    var req = {
                        method: 'POST',
                        url: '/crack',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        data: { modulus: self.modulus }
                    };
                    $http(req).then(function(response) {
                        self.n1 = response.data.n1;
                        self.n2 = response.data.n2;
                    });
                };
                
            }
        });

