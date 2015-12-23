(function() {
    'use strict';

    angular
        .module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['contactService'];

    function ContactController(contactService) {
        var vm = this;
        vm.fullName = "";
        vm.email = "";
        vm.message = "";

        vm.submit = function() {
            var info = {
                fullName: vm.fullName,
                email: vm.email,
                message: vm.message
            };

            contactService.submitInfo(info).then(function() {
                // TODO: add flash statement
            }, function() {
                // TODO: add flash statement on err
            });
        };
    }
}());