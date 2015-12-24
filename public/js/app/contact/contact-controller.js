(function() {
    'use strict';

    angular
        .module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['contactService', 'Flash'];

    function ContactController(contactService, Flash) {
        var vm = this;

        vm.fullName = "";
        vm.email = "";
        vm.message = "";

        vm.submitSuccessFlash = function() {
            var message = 'I sent your message successfully!';
            Flash.create('success', message, 'contact-flash');
        };

        vm.submitFailedFlash = function(err) {
            var message = 'I am unable to send your message, please review the input fields';
            Flash.create('warning', message, 'contact-flash');
        };

        vm.submit = function() {
            var info = {
                fullName: vm.fullName,
                email: vm.email,
                message: vm.message
            };

            contactService.submitInfo(info).then(function(result) {
                vm.submitSuccessFlash();
                console.log(JSON.stringify(result));
            }, function(err) {
                vm.submitFailedFlash(err);
                console.error(err);
            });
        };
    }
}());