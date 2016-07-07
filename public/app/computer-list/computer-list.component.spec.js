describe('computerList', function() {

  // Load the module that contains the `computerList` component before each test
  beforeEach(module('computerList'));

  // Test the controller
  describe('ComputerListController', function() {
    var $httpBackend, ctrl;
    
    var computers = { computers: [
            { name: "dusan", ip: "192.168.1.10" },
            { name: "jasek", ip: "dunajska.luzna" }
    ] };
      
    beforeEach(inject(function($componentController, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/computers').respond(computers);

    ctrl = $componentController('computerList');
    }));
    
    it('should have computers undefined', function() {
      expect(ctrl.computers).toBeUndefined;
    });
    
    it('should fetch computer data', function() {
      expect(ctrl.computers).toBeUndefined;
      $httpBackend.flush();
      for (i = 0; i < computers.length; ++i) {
          expect(computers[i].name).toEqual(ctrl.computers[i].name);
          expect(computers[i].ip  ).toEqual(ctrl.computers[i].ip  );
      }
    });
    
    it('should assing all computers color', function() {
      expect(ctrl.computers).toBeUndefined;
      $httpBackend.flush();
      for (i in ctrl.computers) {
          expect(ctrl.computers[i].color).toBeDefined();
      }
    });

  });

});