'use strict';
angular.module('angular-tiny-modal')
    .factory('AngularTinyModalBase', [
      '$compile',
      '$rootScope',
      '$timeout',
      '$templateCache',
      '$http',
      function( $compile, $rootScope, $timeout, $templateCache, $http ){

        return function ModalBase( template, scopeParams ) {

          var docBody = angular.element( document.body );

          var modalMethods = {
            close: closeModal,
            open: openModal
          };

          var element = angular.element( template );

          // create a scope for the modal, extend it with scope passed in
          // params
          var scope = angular.extend( $rootScope.$new(), scopeParams || {} );

          // compile the element with extended scope
          var directive = $compile( element )( angular.extend( scope, modalMethods ) );

          return modalMethods;

          function openModal() {
            // append directive to document.body
            docBody.append( directive );
          }

          function closeModal() {
            // add animations
            directive.removeClass('fadeIn');
            directive.addClass('fadeOut');
            // remove dom node. this should also destroy the scope
            $timeout( function() {
              directive.remove();
              // explicitly destroy scope as safe measure
              scope.close();
            }, 500);
          }
        }
      }
    ]);
