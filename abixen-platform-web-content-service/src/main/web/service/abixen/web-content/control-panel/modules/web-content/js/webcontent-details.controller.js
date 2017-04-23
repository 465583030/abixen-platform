/**
 * Copyright (c) 2010-present Abixen Systems. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

(function () {

    'use strict';

    angular
        .module('webContentServiceWebContentModule')
        .controller('WebContentServiceWebContentDetailsController', WebContentServiceWebContentDetailsController);

    WebContentServiceWebContentDetailsController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        '$log',
        'WebContent',
        'responseHandler'
    ];

    function WebContentServiceWebContentDetailsController($scope, $state, $stateParams, $log, WebContent, responseHandler) {

        var webContentDetails = this;
        webContentDetails.entity=null;
        webContentDetails.onSuccessSaveForm=onSuccessSaveForm;
        new AbstractDetailsController(webContentDetails, WebContent, responseHandler, $scope,
            {
                entityId: $stateParams.id,
                getValidators: getValidators,
                onSuccessSaveForm: onSuccessSaveForm
            }
        );

        webContentDetails.ckeditorOptions = {
            language: 'en',
            allowedContent: true,
            entities: false
        };


        function onSuccessSaveForm() {

            WebContent.update({id: $stateParams.id}, webContentDetails.entity, function () {
                $log.log('WebContent added has been updated: ', webContentDetails.entity);
                $state.go('application.webContentService.webContent.list');
            });
        }
        function getValidators() {
            var validators = [];

            validators['title'] =
                [
                    new NotNull(),
                    new Length(6, 255)
                ];

            validators['content'] =
                [
                    new NotNull()
                ];

            return validators;
        }

    }
})();
