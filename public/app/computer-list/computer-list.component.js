angular.
        module('computerList').
        component('computerList', {
            templateUrl: 'computer-list/computer-list.template.html',
            controller: function computerListController($http) {
                var self = this;
                
                $http({
                    method: 'GET',
                    url: '/computers'
                }).then(function(response) {
                    self.computers = response.data.computers;
                    for (computer in self.computers) {
                        self.computers[computer].color = intToRGB(hashCode(self.computers[computer].ip.split(":").pop()));
                    }
                });
                
            }
        });
        
function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i)*i*i + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

