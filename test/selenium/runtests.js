var chai        = require('chai'),
    assert      = chai.assert,
    expect      = chai.expect,
    webdriverjs = require('webdriverjs'),
    uuid = require('node-uuid');

describe('RUN TrackerUI Integration Tests', function(){

    this.timeout(99999999);
    var client = {};

    before(function(){
        client = webdriverjs.remote({ desiredCapabilities: {browserName: 'chrome'} });
        client.init();
    });

    it('navigates to signup',function(done) {
        client
            .url('http://localhost:3000')
            .click('a[ui-sref="signup.start"]', function(err,res) {
                expect(err).to.be.null;
            })
            .call(done);
    });
    it('create company record',function(done) {
        client
            .getText('.workflow-step.ng-scope.active', function(err,text) {
                expect(err).to.be.null;
                assert.include(text, 'Sign Up');
            })
            .setValue('#company_name', 'Escapado Corp')
            .setValue('#user_name', 'Joe Excapado')
            .setValue('#user_email', 'test-'+uuid.v4()+'@friendfund.com')
            .setValue('#password', 'maropa2M')
            .submitForm('.form-validated.form-box', function(err){
                expect(err).to.be.null;
            })
            .call(done);
    });

    it('create account with one event',function(done) {
        client.setValue('#account_name', 'Account '+uuid.v4())
            .click('.list-selector.list-selectable .item:first-child')
            .getText('.list-selector.list-removeable .item', function(err, text){
                console.log(arguments);
                expect(err).to.be.null;
            })
            .getText('.workflow-step.ng-scope.active', function(err,text) {
                console.log(arguments);
                expect(err).to.be.null;
                assert.include(text, 'Create Account');
            })
            .call(done);
    });

    after(function(done) {
        client.end(done);
    });
});