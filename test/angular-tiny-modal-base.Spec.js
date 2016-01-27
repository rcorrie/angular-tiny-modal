(function(){

  describe('Service: modalbase', function () {

    var $timeout;
    var ModalBase;
    var MOCK_TEMPLATE_URL = '/url/template.html';
    var MOCK_ELEMENT_ID = 'my-element-id';
    var MOCK_TEMPLATE = '<h1 id="'+MOCK_ELEMENT_ID+'">Hello World</h1>';
    var MOCK_PARAMS = { a: 1 };

    // Instantiate the Application
    beforeEach(module('angular-tiny-modal'));

    beforeEach(inject(function(_$timeout_, _AngularTinyModalBase_, _ATM_CONSTANTS_ ){
      // Inject Necessary services
      $timeout = _$timeout_;
      ModalBase = _AngularTinyModalBase_;
      CONSTANTS = _ATM_CONSTANTS_;
    }));

    describe('on init', function() {

      it('should create a new scope and extend it with the scope passed in the `params` parameter', function() {
        spyOn( angular, 'extend' ).and.callThrough();
        ModalBase( MOCK_TEMPLATE, MOCK_PARAMS );
        expect( angular.extend )
        .toHaveBeenCalledWith( jasmine.any(Object), MOCK_PARAMS);
      });

      it('should return modal methods `open` and `close`', function() {
        var modal = ModalBase( CONSTANTS.MODAL_FROM_TEMPLATE_FLAG, MOCK_TEMPLATE, MOCK_PARAMS );
        expect( modal.open ).toBeDefined();
        expect( modal.close ).toBeDefined();
      });

    });

    describe('method `openModal`', function() {

      beforeEach(function() {
        this.modal = new ModalBase( MOCK_TEMPLATE, MOCK_PARAMS );
      });

      afterEach(function() {
        this.modal.close();
        $timeout.flush();
      });

      it('should append new compiled element to the `document.body`', function() {
        spyOn( angular.element.prototype, 'append' );
        this.modal.open();
        expect( angular.element.prototype.append )
        .toHaveBeenCalled();
      });

      it('should render the HTML node on the DOM', function() {
        this.modal.open();
        var element = $('#'+MOCK_ELEMENT_ID);
        expect(element).toExist();
      });

      it('should render the HTML node on the DOM bound to a scope', function() {
        this.modal.open();
        var elementScope = angular.element(document.querySelector('#'+MOCK_ELEMENT_ID)).scope();
        expect(elementScope).toBeDefined();
      });

    });

    describe('method `closeModal`', function() {

      beforeEach(function() {
        this.modal = new ModalBase( MOCK_TEMPLATE, MOCK_PARAMS );
      });

      it('should remove `fadeIn` className', function() {
        spyOn( angular.element.prototype, 'removeClass' );
        this.modal.open();
        this.modal.close();
        expect( angular.element.prototype.removeClass )
        .toHaveBeenCalledWith('fadeIn');
        $timeout.flush();
      });

      it('should add `fadeOut` className', function() {
        spyOn( angular.element.prototype, 'addClass' );
        this.modal.open();
        this.modal.close();
        expect( angular.element.prototype.addClass)
        .toHaveBeenCalledWith('fadeOut');
        $timeout.flush();
      });

      it('should remove the element from the DOM', function() {
        this.modal.open();
        var element = $('#'+MOCK_ELEMENT_ID);
        expect(element).toExist();
        this.modal.close();
        $timeout.flush();
        element = $('#'+MOCK_ELEMENT_ID);
        expect(element).not.toExist();
      });

      it('should destroy the modal\'s scope', function() {
        this.modal.open();
        var elementScope = angular.element(document.querySelector('#'+MOCK_ELEMENT_ID)).scope();
        expect(elementScope).toBeDefined();
        this.modal.close();
        $timeout.flush();
        elementScope = angular.element(document.querySelector('#'+MOCK_ELEMENT_ID)).scope();
        expect(elementScope).not.toBeDefined();
      });

    });

  });

})();
