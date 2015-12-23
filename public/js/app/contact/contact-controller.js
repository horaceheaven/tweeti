(function() {
    'use strict';

    angular
        .module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['contactService'];

    function ContactController(contactService) {
        var vm = this;
        vm.fullname = "";
        vm.email = "";
        vm.message = "";

        vm.submit = function() {
            var info = {
                fullName: vm.fullname,
                email: vm.email,
                message: vm.message
            };

            var isSuccessful = contactService.submitInfo(info);

            if (isSuccessful) {

            } else {

            }
        };
    }
}());